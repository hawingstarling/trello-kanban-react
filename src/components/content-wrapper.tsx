import type { ReactNode } from 'react';
import { cn } from 'src/lib/utils';
// helpers

export interface ContentWrapperProps {
  className?: string;
  children: ReactNode;
}

export const ContentWrapper = ({ className, children }: ContentWrapperProps) => (
  <div className="h-full w-full overflow-hidden">
    <div className={cn('relative h-full w-full overflow-x-hidden overflow-y-scroll', className)}>
      {children}
    </div>
  </div>
);
