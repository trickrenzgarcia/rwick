import ContactMe from '@/components/contact-me';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Contact | Patrick Renz Garcia's Portfolio",
  description:
    "Get in touch with Patrick Renz Garcia, a web developer and designer.",
};

export default function ContactPage() {
  return (
    <div className="w-full h-full max-w-screen-lg mx-auto pt-32 pb-16">
      <ContactMe />
    </div>
  );
}
