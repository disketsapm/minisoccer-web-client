'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForgotPassword } from '@/hooks/auth/useForgotPasword';

const formSchema = z
  .object({
    password: z.string().min(8, { message: 'Password harus minimal 8 karakter' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password confirmation doesn't match",
    path: ['passwordConfirmation'],
  });
type UserFormValues = z.infer<typeof formSchema>;
export const ResetPasswordForm = ({ token }: any) => {
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    forgotPassword(data);
  };

  return (
    <>
      <div className="flex items-start justify-center w-full gap-5 rounded-xl flex-col">
        <div className="text-6xl font-bold">
          Reset <br /> Password
        </div>
        <p>Masukan password baru Kamu</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      isPassword
                      showPasswordIcon
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Minimal berisi 8 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Confirmation Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      isPassword
                      showPasswordIcon
                      type="password"
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
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
