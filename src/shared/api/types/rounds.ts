export type RoundStatus = 'active' | 'cooldown' | 'finished';
export type RoundStatusFilter = RoundStatus;

export interface Round {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
  status?: RoundStatus;
}

export interface RoundsListPagination {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface RoundsListResponse {
  data: Round[];
  pagination: RoundsListPagination;
}

export interface RoundTopStat {
  taps: number;
  score: number;
  user: {
    username: string;
  };
}

export interface RoundMyStats {
  taps: number;
  score: number;
}

export interface RoundDetailsResponse {
  round: Round;
  topStats: RoundTopStat[];
  myStats: RoundMyStats;
}

export interface TapResponse {
  taps: number;
  score: number;
}

export type CreateRoundResponse = Round;
