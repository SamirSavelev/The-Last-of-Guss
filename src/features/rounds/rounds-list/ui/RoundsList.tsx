import type { FC } from 'react';
import { Alert, Card, List, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { useRoundsQuery } from '@shared/api/hooks/useRounds';
import type { Round } from '@shared/api/types/rounds';
import { formatDateTime } from '@shared/lib/date/formatDateTime';
import { getRoundPhase } from '@shared/lib/date/getRoundPhase';

import type { ApiError } from '@shared/api/axiosClient';

import './RoundsList.scss';

const { Text } = Typography;

const getStatusLabel = (round: Round): string => {
  const phase = getRoundPhase(round);

  switch (phase) {
    case 'active':
      return 'Активен';
    case 'cooldown':
      return 'Cooldown';
    case 'finished':
      return 'Завершен';
    default:
      return phase;
  }
};

export const RoundsList: FC = () => {
  const { data, isLoading, isError, error } = useRoundsQuery();

  if (isLoading) {
    return (
      <div className="rounds-list__center">
        <Spin />
      </div>
    );
  }

  if (isError) {
    const apiError = error as ApiError;
    const message =
      apiError.response?.data?.message ?? 'Не удалось загрузить раунды';

    return (
      <Alert
        type="error"
        title={message}
        showIcon
        className="rounds-list__alert"
      />
    );
  }

  if (!data || data.data.length === 0) {
    return <Text className="rounds-list__empty">Раундов пока нет.</Text>;
  }

  return (
    <div className="rounds-list">
      <List
        dataSource={data.data}
        renderItem={(round) => (
          <List.Item className="rounds-list__item">
            <Card
              className="rounds-list__card"
              variant="borderless"
              size="small"
            >
              <div className="rounds-list__header">
                <span className="rounds-list__bullet">●</span>
                <Link
                  to={`/rounds/${round.id}`}
                  className="rounds-list__round-id-link"
                >
                  Round ID: {round.id}
                </Link>
              </div>

              <div className="rounds-list__times">
                <Text>Start: {formatDateTime(round.startTime)}</Text>
                <Text>End:&nbsp;&nbsp;{formatDateTime(round.endTime)}</Text>
              </div>

              <div className="rounds-list__divider" />

              <Text className="rounds-list__status">
                Статус: {getStatusLabel(round)}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
