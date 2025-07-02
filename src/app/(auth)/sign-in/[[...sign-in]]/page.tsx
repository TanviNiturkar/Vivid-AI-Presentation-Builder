import { SignIn } from '@clerk/nextjs';

export default function Signin() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      forceRedirectUrl="/dashboard" // ✅ NEW — replaces deprecated redirectUrl
    />
  );
}
