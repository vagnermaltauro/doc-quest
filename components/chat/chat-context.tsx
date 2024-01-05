import * as React from 'react';
import { useMutation } from '@tanstack/react-query';

import { INFINIT_QUERY_LIMIT } from '@/config/infinite-query';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/app/_trpc/client';

type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};
export const ChatContext = React.createContext<StreamResponse>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: React.ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const utils = trpc.useContext();
  const backupMessage = React.useRef('');
  const { toast } = useToast();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage('');

      await utils.getFileMessages.cancel();
      const previousMessages = utils.getFileMessages.getInfiniteData();
      utils.getFileMessages.setInfiniteData(
        {
          fileId,
          limit: INFINIT_QUERY_LIMIT,
        },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          let newPages = [...old.pages];
          let latestPage = newPages[0]!;

          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        },
      );

      setIsLoading(true);

      return { previousMessages: previousMessages?.pages.flatMap((page) => page.messages) ?? [] };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);

      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh the page and try again',
          variant: 'destructive',
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let accResponse = '';
      while (!done) {
        const { value, done: _done } = await reader.read();
        done = _done;
        const chunkValue = decoder.decode(value);

        accResponse += chunkValue;

        utils.getFileMessages.setInfiniteData({ fileId, limit: INFINIT_QUERY_LIMIT }, (old) => {
          if (!old) return { pages: [], pageParams: [] };

          let isAiResponseCreated = old.pages.some((page) =>
            page.messages.some((m) => m.id === 'ai-response'),
          );

          let updatedPages = old.pages.map((page) => {
            if (page === old.pages[0]) {
              let updatedMessages;

              if (!isAiResponseCreated) {
                updatedMessages = [
                  {
                    createdAt: new Date().toISOString(),
                    id: 'ai-response',
                    text: accResponse,
                    isUserMessage: false,
                  },
                  ...page.messages,
                ];
              } else {
                updatedMessages = page.messages.map((m) => {
                  if (m.id === 'ai-response') {
                    return {
                      ...m,
                      text: accResponse,
                    };
                  }

                  return m;
                });
              }

              return { ...page, messages: updatedMessages };
            }

            return page;
          });

          return { ...old, pages: updatedPages };
        });
      }
    },
    onError: (_, __, content) => {
      setMessage(backupMessage.current);
      utils.getFileMessages.setData({ fileId }, { messages: content?.previousMessages ?? [] });
    },
    onSettled: async () => {
      setIsLoading(false);
      await utils.getFileMessages.invalidate({ fileId });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
