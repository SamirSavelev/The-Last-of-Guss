import type { Round, RoundStatus } from '@shared/api/types/rounds';

export type RoundPhase = RoundStatus;

export const getRoundPhase = (
  round: Round,
  now: Date = new Date()
): RoundPhase => {
  if (round.status) {
    return round.status;
  }

  const startMs = new Date(round.startTime).getTime();
  const endMs = new Date(round.endTime).getTime();
  const nowMs = now.getTime();

  if (nowMs < startMs) {
    return 'cooldown';
  }

  if (nowMs < endMs) {
    return 'active';
  }

  return 'finished';
};
