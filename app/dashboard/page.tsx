import { redirect } from 'next/navigation';
import db from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { Dashboard } from '@/components/dashboard';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect('/auth-callback?origin=dashboard');

  return <Dashboard />;
}
