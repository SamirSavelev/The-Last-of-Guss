import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roundsApi, type GetRoundsParams } from '../roundsApi';
import type {
  RoundsListResponse,
  RoundDetailsResponse,
  TapResponse,
  CreateRoundResponse,
} from '../types/rounds';
import type { ApiError } from '../axiosClient';

export const roundsKeys = {
  root: ['rounds'] as const,
  list: (params?: GetRoundsParams) => ['rounds', 'list', params] as const,
  details: (id: string) => ['rounds', 'details', id] as const,
};

export const useRoundsQuery = (params?: GetRoundsParams) =>
  useQuery<RoundsListResponse, ApiError>({
    queryKey: roundsKeys.list(params),
    queryFn: () => roundsApi.getRounds(params),
  });

export const useRoundDetailsQuery = (id: string) =>
  useQuery<RoundDetailsResponse, ApiError>({
    queryKey: roundsKeys.details(id),
    queryFn: () => roundsApi.getRound(id),
    enabled: Boolean(id),
  });

export const useCreateRoundMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoundResponse, ApiError, void>({
    mutationFn: () => roundsApi.createRound(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roundsKeys.root });
    },
  });
};

export const useTapRoundMutation = (roundId: string) => {
  const queryClient = useQueryClient();

  return useMutation<TapResponse, ApiError, void>({
    mutationFn: () => roundsApi.tap(roundId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roundsKeys.details(roundId),
      });
    },
  });
};
