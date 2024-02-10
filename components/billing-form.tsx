'use client';

import { getUserSubscriptionPlan } from '@/lib/stripe';
import { trpc } from '@/app/_trpc/client';

import { Icons } from './icons';
import { MaxWidthWrapper } from './max-width-wrapper';
import { Button } from './ui/button';
import { CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';
import { format } from 'date-fns';

interface BillingProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

export function BillingForm({ subscriptionPlan }: BillingProps) {
  const { toast } = useToast();

  const { mutate: createStripeSession, isLoading } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) window.location.href = url;

      if (!url) {
        toast({
          title: 'There was a problem...',
          description: 'Please try again in a moment',
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <MaxWidthWrapper className="max-w-5xl">
      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          createStripeSession();
        }}
      >
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start space-y-2 md-flex:row md:justify-between md:space-x-0">
            <Button variant="ghost" type="submit">
            {isLoading ? <Icons.loader2 className="mr-4 h-4 w-4 animate-spin" /> : null}
            {subscriptionPlan.isSubscribed ? 'Manage Subscription' : 'Upgrade to PRO'}
          </Button>
          {subscriptionPlan.isSubscribed ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled ? 'Your plan will be canceled on ' : 'Your plan renews on'}
              {format(subscriptionPlan.stripeCurrentPeriodEnd!, 'dd.MM.yyyy')}.
            </p>
          ) : null}
        </CardFooter>
      </form>
    </MaxWidthWrapper>
  );
}
