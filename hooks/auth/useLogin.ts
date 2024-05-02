import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useCustomToast from "../core/useCustomToast";

type LoginRequestBody = {
  email: string;
  password: string;
};

export function useLogin() {
  const authService = new AuthService();
  const router = useRouter();

  const { openToast } = useCustomToast();

  return useMutation({
    mutationFn: (data: LoginRequestBody) => authService.login(data),
    onSuccess: () => {
      openToast({
        message: "Login berhasil",
        variant: "success",
      });

      router.replace("/");
    },
    onError: (error: any) => {
      openToast({
        message: error.response.data.message,
        variant: "error",
      });
    },
  });
}
