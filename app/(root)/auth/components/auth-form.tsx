"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Kolom ini wajib diisi."
    })
    .email(),
  password: z
    .string({
      required_error: "Kolom ini wajib diisi."
    })
    .min(1)
});

const registrationSchema = z.object({
  email: z
    .string({
      required_error: "Kolom ini wajib diisi."
    })
    .email({ message: "Alamat email tidak valid." }),
  password: z.string({
    required_error: "Kolom ini wajib diisi."
  }),
  fullName: z.string({
    required_error: "Kolom ini wajib diisi."
  }),
  phoneNumber: z.string({
    required_error: "Kolom ini wajib diisi."
  })
});

type AuthFormValues = {
  type?: string;
};

export const AuthForm = ({ type }: AuthFormValues) => {
  const formSchema = type !== "login" ? registrationSchema : loginSchema;

  type UserFormValues = z.infer<typeof formSchema>;

  const [loading, setLoading] = useState(false);
  const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: registerUser } = useRegister();

  const action = type ? "Masuk" : "Daftar";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (dataForm: any) => {
    if (type === "login") {
      await loginUser(dataForm);
    } else {
      await registerUser(dataForm);
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
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Nama Lengkap"
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
                      <FormLabel>Nomer Telepon</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Nomer Telepon"
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
                variant={"accent-1"}
                className="float-right max-w-[30%]"
                type="submit"
              >
                {action}
              </Button>
              {type && (
                <Link
                  className="underline text-red-500 font-medium"
                  href={"/auth?type=forgot-password"}
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
