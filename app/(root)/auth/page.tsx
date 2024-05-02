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
import { useLoginGoogle } from "@/hooks/auth/useLoginGoogle";
import { useEffect, useState } from "react";
import usePutReservationAfterPayment from "./hooks/usePutReservationAfterPayment";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ModalInfoBooking from "../reservation/components/reservation-modal-info";
import useCustomToast from "@/hooks/core/useCustomToast";

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
  const orderId = type === "order-status" ? searchParams.get("order_id") : null;
  const transaction_status = searchParams.get("transaction_status");

  const error = searchParams.get("error");

  const { mutate, isPending, isError, isSuccess } =
    usePutReservationAfterPayment();

  useEffect(() => {
    if (orderId) {
      mutate({ order_id: orderId });
    }
  }, [orderId, mutate]);

  const RenderLabelTransactionStatus = () => {
    if (transaction_status) {
      if (transaction_status === "pending") {
        return (
          <>
            <div className="text-6xl font-bold">
              Pembayaran <br /> Anda <br /> Sedang Diproses
            </div>
            <p>Silakan Tunggu Secara Berkala</p>
          </>
        );
      }

      if (transaction_status === "error" || isError) {
        return (
          <>
            <div className="text-6xl font-bold">
              Terjadi <br /> Kesalahan <br /> Pembayaran
            </div>
            <p>Silakan Coba Kembali Pembayaran</p>
          </>
        );
      }

      if (transaction_status === "settlement") {
        return (
          <>
            <div className="text-6xl font-bold">
              Pembayaran <br /> Anda <br /> Berhasil!
            </div>
            <p>Silakan Cek Email Anda</p>
          </>
        );
      }
    }

    return <></>;
  };

  const renderLabel = () => {
    if (activeTab === "register") return "Buat Akun";

    if (activeTab === "login") return "Masuk";

    if (type === "register-success") return "Buat Akun";

    if (type === "email-verified") return "Buat Akun";

    if (type === "waiting-payment") return "Pembayaran";

    if (
      type === "forgot-password" ||
      type === "forgot-password-verify" ||
      type === "forgot-password-success"
    )
      return "Lupa Password";
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
            {type === "register-success" ? (
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
            ) : type === "email-verified" ? (
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
            ) : type === "forgot-password" ? (
              <ForgotPasswordForm />
            ) : type === "waiting-payment" ? (
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
            ) : type === "forgot-password-success" ? (
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
            ) : type === "forgot-password-verify" ? (
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
            ) : type === "order-status" ? (
              <div className="flex items-start justify-center w-full gap-10 rounded-xl flex-col">
                {isPending && transaction_status && (
                  <Skeleton className="w-[250px] md:w-full  h-[250px]" />
                )}

                {!isPending && transaction_status && (
                  <RenderLabelTransactionStatus />
                )}
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
                        (window.location.href =
                          "https://api-stg.soccerchief.co/auth/google?role=Customer")
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
