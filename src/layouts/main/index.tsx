import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from 'src/components/navigation';

interface IMainLayoutProps {
  className?: string;
}

function MainLayout(props: IMainLayoutProps) {
  const { className } = props;

  return (
    <div className={clsx('main-layout', className)}>
      <div className="flex h-full dark:bg-[#1F1F1F]">
        <Navigation />
        <main className="h-full flex-1 overflow-y-auto bg-secondary">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default React.memo(MainLayout);
