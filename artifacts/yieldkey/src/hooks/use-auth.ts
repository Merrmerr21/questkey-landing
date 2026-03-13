import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import type { LoginRequest, RegisterRequest, AuthResponse, User, SuccessResponse } from "@workspace/api-client-react/src/generated/api.schemas";

export function useUser() {
  return useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: () => fetchApi<User>('/auth/me'),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await fetchApi<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      localStorage.setItem('yk_token', res.token);
      return res.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['/api/auth/me'], user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const res = await fetchApi<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      localStorage.setItem('yk_token', res.token);
      return res.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['/api/auth/me'], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await fetchApi<SuccessResponse>('/auth/logout', { method: 'POST' });
      localStorage.removeItem('yk_token');
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/auth/me'], null);
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}
