import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCreateRoundMutation } from '@shared/api/hooks/useRounds';
import { useStore } from '@app/providers/StoreProvider';

import './CreateRoundButton.scss';

export const CreateRoundButton = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const { mutate: createRound, isPending } = useCreateRoundMutation();

  const handleClick = () => {
    createRound(undefined, {
      onSuccess: (round) => {
        if (userStore.isAdmin) {
          navigate(`/rounds/${round.id}`);
        }
      },
    });
  };

  if (!userStore.isAdmin) {
    return null;
  }

  return (
    <Button
      className="create-round-button"
      type="primary"
      onClick={handleClick}
      loading={isPending}
      size="large"
    >
      Создать раунд
    </Button>
  );
};
