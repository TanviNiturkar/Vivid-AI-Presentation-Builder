// app/(auth)/callback/page.tsx or wherever your callback lives

import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/actions/user';

const AuthCallbackPage = async () => {
  await onAuthenticateUser(); // optional to keep logic
  redirect('/dashboard');
  return null;
};

export default AuthCallbackPage;
