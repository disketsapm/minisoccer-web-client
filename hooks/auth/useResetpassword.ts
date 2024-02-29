import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useResetPassword() {
  const authService = new AuthService();
  const route = useRouter();

  return useMutation({
    mutationFn: (body: { password: string; token: string }) =>
      authService.resetPassword(body),
    onSuccess: () => {
      toast.success("Email Lupa Password Terkirim");
      route.push("/auth?type=forgot-password-success");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
