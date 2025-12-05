import type { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@app/providers/StoreProvider';
import { Typography } from 'antd';
import './Header.scss';

const { Text } = Typography;

interface Props {
  title: string;
}

export const Header: FC<Props> = observer(({ title }) => {
  const { userStore } = useStore();

  return (
    <header className="header">
      <Text className="header__title">{title}</Text>
      <Text className="header__username">{userStore.currentUser?.name}</Text>
    </header>
  );
});
