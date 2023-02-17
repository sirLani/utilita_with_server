import React from 'react';
import { twMerge } from 'tailwind-merge';

export type HeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.ComponentProps<HeadingVariants> {
  className?: string;
  readonly as?: HeadingVariants;
}

const Root: React.ForwardRefRenderFunction<HTMLHeadingElement, HeadingProps> = (
  { className, children, as, ...props },
  ref
) => {
  const TagName = as || 'h1';
  const classes = twMerge('font-medium text-3xl text-black', className);
  return (
    <TagName ref={ref} className={classes} {...props}>
      {children}
    </TagName>
  );
};

export const Heading = React.forwardRef(Root);
