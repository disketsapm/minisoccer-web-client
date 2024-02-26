"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AuthForm } from "./components/auth-form";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

import { ForgotPasswordForm } from "./components/forgot-password-form";
import { ResetPasswordForm } from "./components/reset-password-form";
import Link from "next/link";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const token = searchParams.get("token");

  return (
    <div
      className="flex justify-center items-center min-h-[70vh] py-14"
      style={{
        backgroundImage: `url(/images/auth/bg-auth.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="border-2 border-black rounded-xl">
        <CardContent className="w-full max-h-[100%] p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:min-w-[800px] ">
            <div className="flex-shrink-0 hidden w- lg:block">
              <Image
                src="/images/auth/bola.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
            {type === "register-success" ? (
              <div className="flex items-start justify-center w-full gap-10 rounded-xl flex-col">
                <div className="text-6xl font-bold">
                  Silahkan Cek <br /> Email Kamu!
                </div>
                <p>
                  Cek link yang telah dikirimkan di Email <br /> Kamu untuk
                  me-reset password.
                </p>
              </div>
            ) : type === "email-verified" ? (
              <div className="flex items-start justify-center w-full gap-10 rounded-xl flex-col">
                <div className="text-6xl font-bold">
                  Email <br /> Terverifikasi
                </div>
                <p>
                  Email Kamu telah terverifikasi, <br /> silahkan login untuk
                  melanjutkan.
                </p>
              </div>
            ) : type === "forgot-password" ? (
              <ForgotPasswordForm />
            ) : type === "forgot-password-success" ? (
              <div className="flex items-start justify-center w-full gap-10 rounded-xl flex-col">
                <div className="text-6xl font-bold">
                  Reset <br /> Password <br /> Berhasil!
                </div>
                <p>Selamat! Password Kamu telah dirubah!</p>

                <Link href="/">
                  <Button
                    variant={"accent-1"}
                    className="px-6 py-2 text-xs md:px-10 md:py-6"
                  >
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            ) : type === "reset-password" ? (
              <ResetPasswordForm token={token} />
            ) : (
              <Tabs defaultValue="register" className="w-full md:min-w-[400px]">
                <div className="flex justify-center">
                  <TabsList className="grid grid-cols-2 bg-gray-400 gap-2 w-[90%]">
                    <TabsTrigger
                      className="data-[state=active]:bg-[#F9D548] data-[state=active]:border border-black bg-white text-black"
                      value="register"
                    >
                      Buat Akun
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bg-[#F9D548] data-[state=active]:border border-black bg-white text-black"
                      value="login"
                    >
                      Masuk
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex justify-center my-4">
                  <Button
                    variant={"outline"}
                    className="w-full border-2 border-black"
                  >
                    <FcGoogle className="w-5 h-5 mr-2" /> Sign in with Google
                  </Button>
                </div>
                <TabsContent value="register">
                  <div className="space-y-1">
                    <AuthForm />
                  </div>
                </TabsContent>
                <TabsContent value="login">
                  <div className="space-y-1">
                    <AuthForm type="login" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
