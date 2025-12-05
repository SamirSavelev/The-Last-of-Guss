import type { FC } from 'react';
import { Alert, Card, Spin, Typography } from 'antd';

import {
  useRoundDetailsQuery,
  useTapRoundMutation,
} from '@shared/api/hooks/useRounds';
import { useRoundTimer } from '../hooks/useRoundTimer';
import { GooseAscii } from '@features/rounds/goose';

import './RoundDetails.scss';

const { Text } = Typography;

interface RoundDetailsProps {
  roundId: string;
}

export const RoundDetails: FC<RoundDetailsProps> = ({ roundId }) => {
  const { data, isLoading, isError, error } = useRoundDetailsQuery(roundId);
  const { mutate: tapRound, isPending: isTapping } =
    useTapRoundMutation(roundId);

  const round = data?.round;
  const topStats = data?.topStats ?? [];
  const myStats = data?.myStats;

  const { phase, timeText } = useRoundTimer(round);

  if (isLoading) {
    return (
      <div className="round-details__center">
        <Spin />
      </div>
    );
  }

  if (isError) {
    const message =
      error?.response?.data?.message ?? 'Не удалось загрузить раунд';

    return (
      <div className="round-details__center">
        <Alert
          type="error"
          title={message}
          showIcon
          classNames={{
            root: 'round-details__alert',
          }}
        />
      </div>
    );
  }

  if (!round || !myStats) {
    return (
      <div className="round-details__center">
        <Alert
          type="error"
          title={'Данные раунда недоступны.'}
          showIcon
          classNames={{
            root: 'round-details__alert',
          }}
        />
      </div>
    );
  }

  const handleTap = () => {
    if (phase !== 'active' || isTapping) return;
    tapRound();
  };

  const winner = topStats[0];

  return (
    <Card className="round-details" variant="outlined">
      <GooseAscii disabled={phase !== 'active'} onTap={handleTap} />

      <div className="round-details__info">
        {phase === 'active' && (
          <>
            <Text className="round-details__line">Раунд активен!</Text>
            <Text className="round-details__line">
              До конца осталось: {timeText}
            </Text>
            <Text className="round-details__line">
              Мои очки: {myStats.score}
            </Text>
          </>
        )}

        {phase === 'cooldown' && (
          <>
            <Text className="round-details__line">Cooldown</Text>
            <Text className="round-details__line">
              до начала раунда {timeText}
            </Text>
          </>
        )}

        {phase === 'finished' && (
          <>
            <Text className="round-details__separator"></Text>
            <Text className="round-details__line">
              Всего: {round.totalScore}
            </Text>
            {winner && (
              <Text className="round-details__line">
                Победитель: {winner.user.username} {winner.score}
              </Text>
            )}
            <Text className="round-details__line">
              Мои очки: {myStats.score}
            </Text>
          </>
        )}
      </div>
    </Card>
  );
};
