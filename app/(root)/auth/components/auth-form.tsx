'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLogin } from '@/hooks/auth/useLogin';
import { useRegister } from '@/hooks/auth/useRegister';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
});

type AuthFormValues = {
  type?: string;
};

export const AuthForm = ({ type }: AuthFormValues) => {
  const router = useRouter();
  const formSchema = type === 'login' ? loginSchema : registrationSchema;

  type UserFormValues = z.infer<typeof formSchema>;

  console.log(type);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: registerUser } = useRegister();

  const action = type ? 'Masuk' : 'Daftar';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (dataForm: any) => {
    if (type === 'login') {
      await loginUser(dataForm);
    } else {
      await registerUser(dataForm);
      router.push('/auth?type=register-success');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-2"
          >
            {!type && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="fullname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="number"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="password"
                      type="password"
                      isPassword
                      showPasswordIcon
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5 items-center">
              <Button
                disabled={loading}
                variant={'accent-1'}
                className="float-right max-w-[30%]"
                type="submit"
              >
                {action}
              </Button>
              {type && (
                <Link
                  className="underline text-red-500 font-medium"
                  href={'/auth?type=forgot-password'}
                >
                  Lupa Password
                </Link>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
