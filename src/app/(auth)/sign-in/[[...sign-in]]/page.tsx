// app/(auth)/sign-in/page.tsx
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Signin() {
  return <Link href="/sign-in?redirect_url=/dashboard">Sign In</Link>
}
