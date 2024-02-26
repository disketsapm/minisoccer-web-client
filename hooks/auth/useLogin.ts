import { AuthService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type LoginRequestBody = {
  email: string;
  password: string;
};

export function useLogin() {
  const authService = new AuthService();

  return useMutation({
    mutationFn: (data: LoginRequestBody) => authService.login(data),
    onSuccess: () => {
      toast.success('Login success ');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
