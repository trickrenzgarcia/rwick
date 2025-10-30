'use client';

import { use, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { BrowserIdContext } from './context/browser-id';
import { toast } from 'sonner';
import { addConnection } from '@/actions/add-actions';
import { Spinner } from './ui/spinner';
import { sendEmail } from '@/actions/mailer';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .transform((val) => (val === '' ? undefined : val)) // treat empty string as undefined
    .optional()
    .refine((val) => !val || /^(63\d{10}|09\d{9})$/.test(val), {
      message: 'Valid format: 63XXXXXXXXXX or 09XXXXXXXXX',
    }),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const browserId = use(BrowserIdContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Prevent multiple submissions
      setIsSubmitting(true);

      // Call the server action to add a connection
      await addConnection({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        browserId: browserId ? browserId : 'unknown',
      });

      await sendEmail(data)

      toast.info('Your message has been sent!');

      form.reset();
    } catch (error) {
      // Handle errors appropriately
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <FormControl>
                <Input
                  id='name'
                  placeholder='What should I call you?'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormControl>
                <Input
                  id='email'
                  placeholder='youremail@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='phone'>Phone</FormLabel>
              <FormControl>
                <Input
                  id='phone'
                  type='text'
                  placeholder='(Optional)'
                  {...field}
                  onChange={(e) => {
                    // Allow only digits (0–9)
                    const value = e.target.value.replace(/\D/g, '');
                    field.onChange(value);
                  }}
                  inputMode='numeric' // mobile keyboard shows numbers
                  pattern='[0-9]*'
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='message'>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  id='message'
                  placeholder='What would you like to say?'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
