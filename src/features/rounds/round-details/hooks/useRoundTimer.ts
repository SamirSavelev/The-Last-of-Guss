import { useEffect, useState } from 'react';
import moment from 'moment';
import type { Round } from '@shared/api/types/rounds';

export type RoundPhase = 'active' | 'cooldown' | 'finished';

const formatCountdown = (seconds: number): string => {
  const clamped = Math.max(0, seconds);
  const duration = moment.duration(clamped, 'seconds');

  const totalMinutes = Math.floor(duration.asMinutes());
  const secs = duration.seconds();

  const pad = (v: number) => String(v).padStart(2, '0');

  return `${pad(totalMinutes)}:${pad(secs)}`;
};

export const useRoundTimer = (round?: Round) => {
  const [now, setNow] = useState(() => moment());

  useEffect(() => {
    if (!round) return;

    const intervalId = setInterval(() => {
      setNow(moment());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [round?.id]);

  if (!round) {
    return {
      phase: 'cooldown' as RoundPhase,
      timeText: '00:00',
    };
  }

  const start = moment(round.startTime);
  const end = moment(round.endTime);

  let phase: RoundPhase;
  let remainingSeconds: number;

  if (now.isBefore(start)) {
    phase = 'cooldown';
    remainingSeconds = start.diff(now, 'seconds');
  } else if (now.isBefore(end)) {
    phase = 'active';
    remainingSeconds = end.diff(now, 'seconds');
  } else {
    phase = 'finished';
    remainingSeconds = 0;
  }

  return {
    phase,
    timeText: formatCountdown(remainingSeconds),
  };
};
