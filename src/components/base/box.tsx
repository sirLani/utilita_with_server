import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  className?: string;
}

const Root: React.ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  { className, children, ...props },
  ref
) => {
  const classes = twMerge('relative', className);
  return (
    <div className={classes} ref={ref} {...props}>
      {children}
    </div>
  );
};

export const Box = React.forwardRef(Root);
