// app/(auth)/sign-up/page.tsx
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function Signup() {
  return <Link href="/sign-up?redirect_url=/dashboard">Sign Up</Link>
}
