'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// import { useUpdateUser } from "@/hooks/user/useUpdateUser";
// import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

type AuthFormValues = {
  type?: string;
};

export const AuthForm = ({ type }: AuthFormValues) => {
  console.log(type);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const action = type ? 'Masuk' : 'Daftar';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // console.log(form.watch());

  const onSubmit = async (dataForm: UserFormValues) => {
    try {
      setLoading(true);
      if (type) {
        // updateUser(dataForm);
      } else {
        // addUser(dataForm);
      }
      router.refresh();
      router.push(`/users`);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
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

            <Button
              disabled={loading}
              variant={'accent-1'}
              className="float-right"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
