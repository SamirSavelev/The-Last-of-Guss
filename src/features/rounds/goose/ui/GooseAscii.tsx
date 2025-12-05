import type { FC, MouseEventHandler, DragEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import gooseJpg from '@assets/goose.png';
import clsx from 'clsx';

import './GooseAscii.scss';

interface GooseAsciiProps {
  disabled?: boolean;
  onTap?: MouseEventHandler<HTMLButtonElement>;
}

export const GooseAscii: FC<GooseAsciiProps> = ({ disabled, onTap }) => {
  const [isHit, setIsHit] = useState(false);
  const hitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (disabled) return;

      if (hitTimeoutRef.current) {
        clearTimeout(hitTimeoutRef.current);
      }

      setIsHit(true);
      hitTimeoutRef.current = setTimeout(() => {
        setIsHit(false);
      }, 160);

      onTap?.(event);
    },
    [disabled, onTap]
  );

  const handleImageDragStart = (event: DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    return () => {
      if (hitTimeoutRef.current) {
        clearTimeout(hitTimeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        'goose__button',
        disabled && 'goose__button--disabled',
        isHit && 'goose__button--hit'
      )}
      onClick={handleClick}
    >
      <img
        className="goose__image"
        src={gooseJpg}
        alt="Мутировавший гусь"
        draggable={false}
        onDragStart={handleImageDragStart}
      />
    </button>
  );
};
