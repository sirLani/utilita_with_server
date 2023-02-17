import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextProps extends React.ComponentProps<'p'> {
  className?: string;
  children: React.ReactNode;
}

const Root: React.ForwardRefRenderFunction<HTMLParagraphElement, TextProps> = (
  { className, children, ...props },
  ref
) => {
  const classes = twMerge('font-normal text-sm text-slate-500', className);
  return (
    <p ref={ref} className={classes} {...props}>
      {children}
    </p>
  );
};

export const Text = React.forwardRef(Root);
