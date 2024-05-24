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

import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useEffect, useState } from "react";
import usePutReservationAfterPayment from "./hooks/usePutReservationAfterPayment";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import useCustomToast from "@/hooks/core/useCustomToast";
import {
  ActionType,
  getLabelByTab,
  getLabelByType,
} from "./constants/auth.data";
import { TransactionStatus } from "./components/transaction-status";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("register");

  const searchParams = useSearchParams();
  const loginId = searchParams.get("LoginId");
  const { data } = useLoginGoogle(loginId);

  if (data) {
    window.location.href = "/";
  }

  const type = searchParams.get("type");
  const token = searchParams.get("token");

  const error = searchParams.get("error");

  const renderLabel = (): string => {
    const tabLabel = getLabelByTab(activeTab);
    if (tabLabel) return tabLabel;

    return getLabelByType(type as ActionType);
  };

  const { openToast } = useCustomToast();

  useEffect(() => {
    if (error) {
      openToast({
        message: error,
        variant: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (type) setActiveTab("");
  }, [type]);

  const router = useRouter();

  const SuccessContainer = ({
    title,
    description,
  }: {
    title: React.ReactNode;
    description: React.ReactNode;
  }) => {
    return (
      <div className="flex items-start justify-center w-full gap-4 rounded-xl flex-col">
        <div className="text-6xl font-extrabold">{title}</div>
        <p className="text-sm">{description}</p>
        <Button
          variant={"accent-1"}
          className="px-6 py-2 text-xs md:px-10 md:py-6"
          onClick={() => router.push("/")}
        >
          Kembali ke Beranda
        </Button>
      </div>
    );
  };

  return (
    <div
      className="flex justify-center items-center min-h-[80vh] py-14 px-4 md:px-0  "
      style={{
        backgroundImage: `url(/images/auth/bg-auth.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="rounded-2xl z-10  bg-gradient-to-b from-white to-[#999999] md:h-[530px] h-full pb-8  w-full  md:w-auto ">
        <CardContent className="w-full max-h-[100%] p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:min-w-[800px] w-full ">
            <div className="w-full h-full flex-col relative items-center flex">
              {/* adjust this height if want to adjust the margin of the container */}
              <div className="w-full h-[55px] relative">
                <div className="md:w-[300px] w-full   text-center h-fit -z-10    text-[25px] m-auto left-0 right-0 font-extrabold bg-gradient-to-b from-[#9F9F9F] to-[#FFFFFF00] p-5 md:absolute  rounded-xl">
                  {renderLabel()}
                </div>
              </div>

              <div className="flex-shrink-0 hidden  lg:block">
                <Image
                  src="/images/auth/bola.png"
                  alt="about"
                  priority
                  width={400}
                  height={400}
                />
              </div>
            </div>
            {type === ActionType.RegisterSuccess ? (
              <SuccessContainer
                title={
                  <>
                    Silahkan Cek <br /> Email Kamu!
                  </>
                }
                description={
                  <>
                    Cek link yang telah dikirimkan di Email <br /> Kamu untuk
                    memverifikasi akun.
                  </>
                }
              />
            ) : type === ActionType.EmailVerified ? (
              <SuccessContainer
                title={
                  <>
                    Email <br /> Terverifikasi
                  </>
                }
                description={
                  <>
                    Email Kamu telah terverifikasi, <br /> silahkan login untuk
                    melanjutkan.
                  </>
                }
              />
            ) : type === ActionType.ForgotPassword ? (
              <ForgotPasswordForm />
            ) : type === ActionType.WaitingPayment ? (
              <SuccessContainer
                title={
                  <>
                    Menunggu <br /> Pembayaran
                  </>
                }
                description={
                  <>Cek email kamu untuk melihat pembayaran lebih lanjut</>
                }
              />
            ) : type === ActionType.ForgotPasswordSuccess ? (
              <SuccessContainer
                title={
                  <>
                    Reset <br /> Password <br /> Berhasil!
                  </>
                }
                description={
                  <>
                    <p>Selamat! Password Kamu telah dirubah!</p>
                  </>
                }
              />
            ) : type === ActionType.ForgotPasswordVerify ? (
              <SuccessContainer
                title={
                  <>
                    Silahkan Cek <br /> Email Kamu!
                  </>
                }
                description={
                  <>
                    Cek link yang telah dikirimkan di Email Kamu untuk me-reset
                    password.
                  </>
                }
              />
            ) : type === ActionType.OrderStatus ? (
              <div className="flex items-start justify-center w-full gap-10 rounded-xl flex-col">
                <TransactionStatus />
              </div>
            ) : type === "reset-password" ? (
              <ResetPasswordForm token={token} />
            ) : loginId ? (
              <SuccessContainer
                title={
                  <>
                    Verifikasi <br /> Login!
                  </>
                }
                description={
                  <>
                    Anda akan diarahkan ke halaman utama dalam beberapa detik.
                  </>
                }
              />
            ) : (
              <Tabs
                defaultValue="register"
                className="md:min-w-[400px] h-[400px]"
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
              >
                <div className="flex justify-center w-full">
                  <TabsList className="grid grid-cols-2 bg-[#DADADA] gap-2 w-fit h-fit p-2">
                    <TabsTrigger
                      className="px-6 py-2 data-[state=active]:bg-gradient-to-r from-[#458247] to-[#364D48]  data-[state=active]:text-white    border-black bg-white text-black"
                      value="register"
                    >
                      Buat Akun
                    </TabsTrigger>
                    <TabsTrigger
                      className="px-6 py-2 data-[state=active]:bg-gradient-to-r from-[#458247] to-[#364D48]  data-[state=active]:text-white    border-black bg-white text-black"
                      value="login"
                    >
                      Masuk
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div
                  className={cn("w-full h-full  flex-col flex", {
                    "md:justify-center": activeTab === "login",
                  })}
                >
                  <div className="flex justify-center my-4">
                    <Button
                      variant={"outline"}
                      className="w-full bg-gradient-to-b from-white to-[#C4C4C4] py-7"
                      onClick={() =>
                        (window.location.href = `${process?.env?.NEXT_PUBLIC_API_URL}/auth/google?role=Customer`)
                      }
                    >
                      <FcGoogle className="w-7 h-7 mr-2 text-xl" /> Sign{" "}
                      {`${activeTab === "register" ? "Up" : "In"}`} with Google
                    </Button>
                  </div>
                  <TabsContent value="register">
                    <div className="space-y-1">
                      <AuthForm type={activeTab} />
                    </div>
                  </TabsContent>
                  <TabsContent value="login">
                    <div className="space-y-1">
                      <AuthForm type={activeTab} />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
