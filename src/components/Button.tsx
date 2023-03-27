import type { AriaButtonProps } from '@react-types/button';
import React, { forwardRef } from 'react';
import { clsxm } from '../utils/clsxm';

interface Props extends AriaButtonProps {
  mode?: 'contained' | 'outlined' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode | undefined;
  // @deprecated
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const defaultProps = {
  mode: 'contained',
  size: 'md',
};

const Button = forwardRef<HTMLButtonElement, Props>((props: Props) => {
  const { children, className, size, ...rest } = { ...defaultProps, ...props };

  const classNamesFromSize = (size: string) => {
    switch (size) {
      case 'xs':
        return 'text-xs px-2 py-1 rounded-sm';
      case 'sm':
        return 'text-sm px-3 py-2';
      case 'lg':
        return 'text-lg px-5 py-4';
      case 'xl':
        return 'text-xl px-6 py-5';
      case 'md':
      // fallthrough
      default:
        return 'text-base px-4 py-3';
    }
  };

  return (
    <button
      className={clsxm('flex items-center justify-center transition rounded-lg', classNamesFromSize(size), className)}
      {...rest}
    >
      <>{children}</>
    </button>
  );
});

export default Button;
