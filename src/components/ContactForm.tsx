"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is too short",
  }).max(50, {
    message: "Name is too long",
  }),
  email: z.string().email(),
  message: z.string().min(10, {
    message: "Message is too short",
  }).max(500, {
    message: "Message is too long",
  }),
})

export default function ContactForm() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const lastSubmission = localStorage.getItem("contact-form");
    const now = new Date().getTime();

    if (lastSubmission) {
      const lastSubmissionTime = new Date(lastSubmission).getTime();
      const timeDifference = now - lastSubmissionTime;
      const minutesDifference = timeDifference / (1000 * 60);

      if (minutesDifference < 30) {
        setIsButtonDisabled(true);
        alert(
          `You can only submit once every 30 minutes. Please wait ${
            30 - Math.floor(minutesDifference)
          } more minutes.`
        );
        return;
      }
    }

    // Store the current submission time
    localStorage.setItem("contact-form", new Date().toISOString());

    // Perform the email submission logic here
    console.log(values);

    alert("Form submitted successfully!");
    setIsButtonDisabled(true);
  }


  return (
    <Card className="max-w-2xl border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-4 justify-start lg:justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} id="name" placeholder="Your name" className={cn(form.formState.errors.name?.message && "focus-visible:ring-red-500")} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input 
                        {...field} 
                        id="email" 
                        placeholder="Your email" 
                        className={cn(form.formState.errors.email?.message && "focus-visible:ring-red-500")} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full my-6">
                  <FormControl>
                    <Textarea 
                      {...field} 
                      id="message" 
                      rows={5} 
                      placeholder="Your message"
                      className={cn(form.formState.errors.message?.message && "focus-visible:ring-red-500")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Send</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
