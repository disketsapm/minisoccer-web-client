import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const authService = new AuthService();
  const route = useRouter();

  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success('Email Lupa Password Terkirim');
      route.push('/auth?type=forgot-password-success');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
