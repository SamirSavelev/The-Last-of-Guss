import type { FC } from 'react';
import { Card } from 'antd';

import { CreateRoundButton } from '@features/rounds/create-round-button/ui/CreateRoundButton';
import { RoundsList } from '@features/rounds/rounds-list/ui/RoundsList';
import { Header } from '@widgets';
import './RoundsPage.scss';

export const RoundsPage: FC = () => {
  return (
    <main className="rounds-page">
      <section className="rounds-page__inner">
        <Header title="Список РАУНДОВ" />

        <div className="rounds-page__content">
          <div className="rounds-page__actions">
            <CreateRoundButton />
          </div>

          <Card
            className="rounds-page__list-card"
            variant="borderless"
            size="small"
          >
            <RoundsList />
          </Card>
        </div>
      </section>
    </main>
  );
};
