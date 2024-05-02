import {
  deleteTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useCustomToast from "../core/useCustomToast";

export function useLogout() {
  const authService = new AuthService();
  const router = useRouter();
  const { openToast } = useCustomToast();

  const fetcher = async () => {
    const token = await getTokenFromLocalStorage();

    if (token) {
      return await authService.logout({ token });
    }

    return null;
  };

  return useMutation({
    mutationFn: async () => fetcher(),
    onSuccess: () => {
      openToast({
        message: "Logout berhasil",
        variant: "success",
      });

      router.push("/auth");
      deleteTokenFromLocalStorage();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
    },
    onError: (error: any) => {
      openToast({
        message: error.response.data.message,
        variant: "error",
      });
    },
  });
}
