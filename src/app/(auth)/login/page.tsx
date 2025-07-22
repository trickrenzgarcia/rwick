import LoginForm from '@/components/login-form';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {

  const session = await auth();

  if (session) {
    // If the user is already authenticated, redirect to the dashboard
    return redirect('/');
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/login" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-12 items-center justify-center ">
            <Image src="/Cat.svg" alt="Rwick Logo" width={100} height={100} className="size-12 rounded-md" />
          </div>
          <span className="text-xl font-semibold">(Admin Portal)</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
