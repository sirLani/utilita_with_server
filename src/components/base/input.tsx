import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
  type?: string;
}

const Root: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, type, ...props },
  ref
) => {
  const classes = twMerge(
    'block w-full appearance-none bg-white/[.2] rounded-full  px-5 py-2 placeholder-gray-60 shadow-sm text-white focus:outline-none focus:ring-brand-500 text-xs sm:text-sm',
    className
  );
  return (
    <input ref={ref} type={type ?? 'text'} className={classes} {...props} />
  );
};

export const Input = React.forwardRef(Root);
