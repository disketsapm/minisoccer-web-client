'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForgotPassword } from '@/hooks/auth/useForgotPasword';

const schema = z.object({
  email: z.string().email(),
});
type UserFormValues = z.infer<typeof schema>;
export const ForgotPasswordForm = () => {
  const { mutateAsync: forgotPassowrd, isPending } = useForgotPassword();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    forgotPassowrd(data);
  };

  return (
    <>
      <div className="flex items-start justify-center w-full gap-5 rounded-xl flex-col">
        <div className="text-6xl font-bold">
          Lupa <br /> Password
        </div>
        <p>Silakan masukan Email Kamu untuk mereset password</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Kamu"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'accent-1'}
              className="float-right max-w-[40%]"
              type="submit"
              disabled={isPending}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
