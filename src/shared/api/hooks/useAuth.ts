import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../authApi';
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from '../types/auth';

import type { ApiError } from '../axiosClient';
import { useStore } from '@app/providers/StoreProvider';

export const authKeys = {
  root: ['auth'] as const,
  me: ['auth', 'me'] as const,
};

export const useMeQuery = () => {
  const { userStore } = useStore();

  return useQuery<MeResponse, ApiError>({
    queryKey: authKeys.me,
    queryFn: async () => {
      const me = await authApi.me();
      const { username, role } = me;

      userStore.setCurrentUser({
        id: username,
        name: username,
        role: role,
      });

      return me;
    },
    enabled: false,
    retry: false,
  });
};

export const useLoginMutation = () => {
  const { userStore } = useStore();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: ({ username, token, role }) => {
      localStorage.setItem('authToken', token);

      userStore.setCurrentUser({
        id: username,
        name: username,
        role,
      });

      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};

export const useLogoutMutation = () => {
  const { userStore } = useStore();
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, ApiError, void>({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('authToken');
      userStore.logout();

      queryClient.removeQueries({ queryKey: authKeys.root });
    },
  });
};
