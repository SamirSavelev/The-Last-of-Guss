import { apiClient } from './axiosClient';
import type {
  RoundDetailsResponse,
  RoundsListResponse,
  RoundStatusFilter,
  TapResponse,
  CreateRoundResponse,
} from './types/rounds';

export interface GetRoundsParams {
  cursor?: string;
  limit?: number;
  status?: RoundStatusFilter;
}
const PREFIX = '/api/v1/rounds';

const buildQueryString = (params?: GetRoundsParams): string => {
  if (!params) {
    return '';
  }

  const search = new URLSearchParams();

  if (params.cursor) {
    search.set('cursor', params.cursor);
  }

  if (typeof params.limit === 'number') {
    search.set('limit', String(params.limit));
  }

  if (params.status) {
    search.set('status', params.status);
  }

  const queryParams = search.toString();

  return queryParams ? `?${queryParams}` : '';
};

export const roundsApi = {
  async getRounds(params?: GetRoundsParams): Promise<RoundsListResponse> {
    const queryString = buildQueryString(params);

    const { data } = await apiClient.get<RoundsListResponse>(
      `${PREFIX}${queryString}`
    );

    return data;
  },

  async createRound(): Promise<CreateRoundResponse> {
    const { data } = await apiClient.post<CreateRoundResponse>(PREFIX);

    return data;
  },

  async getRound(id: string): Promise<RoundDetailsResponse> {
    const { data } = await apiClient.get<RoundDetailsResponse>(
      `${PREFIX}/${id}`
    );

    return data;
  },

  async tap(id: string): Promise<TapResponse> {
    const { data } = await apiClient.post<TapResponse>(`${PREFIX}/${id}/tap`);

    return data;
  },
};
