import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string;
  children: React.ReactNode;
}

const Root: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { className, children, ...props },
  ref
) => {
  const classes = twMerge(
    'text-center font-medium rounded text-white p-3 bg-brand-base disabled:bg-gray-20 disabled:text-gray-200 text-sm',
    className
  );
  return (
    <button type="button" ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
};

export const Button = React.forwardRef(Root);
