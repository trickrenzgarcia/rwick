import NotFoundClient from '@/components/not-found-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found | Patrick Renz Garcia's Portfolio",
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    siteName: "Patrick Renz Garcia's Portfolio",
  },
}

const NotFound = () => {
  return (
    <main className="min-h-[100dvh] antialiased relative">
      <NotFoundClient />
    </main>
  );
}

export default NotFound;
