import { SignUp } from '@clerk/nextjs';

export default function Signup() {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      forceRedirectUrl="/dashboard" // ✅ NEW
    />
  );
}
