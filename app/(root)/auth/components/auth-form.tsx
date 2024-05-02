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
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import CustomToast from "@/components/ui/toast";

type AuthFormValues = {
  type?: string;
};

export const AuthForm = ({ type }: AuthFormValues) => {
  const formSchema = z.object({
    email: z
      .string({
        required_error: "Kolom ini wajib diisi.",
      })
      .email({ message: "Alamat email tidak valid." }),
    password: z.string({
      required_error: "Kolom ini wajib diisi.",
    }),
    fullName:
      type === "login"
        ? z.any().nullable()
        : z.string({
            required_error: "Kolom ini wajib diisi.",
          }),
    phoneNumber:
      type === "login"
        ? z.any().nullable()
        : z.string({
            required_error: "Kolom ini wajib diisi.",
          }),
  });

  type UserFormValues = z.infer<typeof formSchema>;

  const { mutateAsync: loginUser, isPending: isPendingLogin } = useLogin();
  const { mutateAsync: registerUser, isPending: isPendingRegister } =
    useRegister();

  const action = type === "login" ? "Masuk" : "Daftar";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
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
            className="flex flex-col w-full gap-4"
          >
            {type === "register" && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          variant="underline"
                          placeholder="Nama Lengkap"
                          {...field}
                          value={field.value || ""}
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
                      <FormControl>
                        <Input
                          variant="underline"
                          placeholder="Nomer Telepon"
                          type="number"
                          {...field}
                          value={field.value || ""}
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
                  <FormControl>
                    <Input
                      placeholder="Email"
                      variant="underline"
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
                  <FormControl>
                    <Input
                      variant="underline"
                      placeholder="Password"
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

            <div
              className={cn("flex gap-2 md:gap-5 md:items-center", {
                "justify-between items-center gap-4": type === "login",
                "flex-col md:flex-row gap-3": type === "register",
              })}
            >
              <Button
                variant={"accent-1"}
                className="float-right w-fit h-fit px-10 py-4 rounded-xl"
                type="submit"
                isLoading={isPendingLogin || isPendingRegister}
              >
                {action}
              </Button>
              {type === "login" && (
                <Link
                  className="underline text-black font-medium md:text-base text-sm"
                  href={"/auth?type=forgot-password"}
                >
                  Lupa Password
                </Link>
              )}

              {type === "register" && (
                <div className="w-full text-xs  flex gap-1">
                  <FaCheck />
                  Silahkan cek email Anda untuk <b>verifikasi</b>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
