"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { login } from '@/actions/auth';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';

const schema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required." }),
})

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await login({ email: data.email, password: data.password });
      
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleFieldChange = () => {
    if (error) {
      setError(null);
    }
  };

  return (
    <div className={cn("", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLoginSubmit)}>
              <div className="grid gap-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Welcome
                  </span>
                </div>
                <div className="grid gap-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="text"
                              placeholder="Enter your admin email"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <a
                              href="#"
                              className="ml-auto text-sm underline-offset-4 hover:underline hidden"
                            >
                              Forgot your password?
                            </a>
                          </div>

                          <FormControl>
                            <Input 
                              id="password" 
                              type="password" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleFieldChange();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
