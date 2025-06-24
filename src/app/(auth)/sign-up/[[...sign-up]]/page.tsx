// app/(auth)/sign-up/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function Signup() {
  return <SignUp afterSignUpUrl="/dashboard" />;
}
