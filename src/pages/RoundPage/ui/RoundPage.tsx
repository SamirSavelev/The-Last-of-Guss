import { useParams } from 'react-router-dom';

import { useRoundDetailsQuery } from '@shared/api/hooks/useRounds';
import { RoundDetails, useRoundTimer } from '@features/rounds/round-details';

import { Header } from '@widgets';

import './RoundPage.scss';

export const RoundPage = () => {
  const { roundId } = useParams<{ roundId: string }>();

  const { data } = useRoundDetailsQuery(roundId || '');
  const round = data?.round;
  const { phase } = useRoundTimer(round);

  if (!roundId) {
    return null;
  }
  let headerTitle = `Раунд!`;

  if (phase === 'cooldown') {
    headerTitle = 'Приготовьтесь!';
  } else if (phase === 'finished') {
    headerTitle = 'Раунд завершен';
  }

  return (
    <main className="round-page">
      <section className="round-page__inner">
        <Header title={headerTitle} />
        <div className="round-page__content">
          <RoundDetails roundId={roundId} />
        </div>
      </section>
    </main>
  );
};
