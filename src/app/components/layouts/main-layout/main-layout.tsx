import styles from './main-layout.module.scss';
import { MainLayoutProps } from './main-layout.types';
import clsx from 'clsx';
import React from 'react';
import Navigation from 'src/components/navigation';

function MainLayout(props: MainLayoutProps) {
  const { children, className, testingID } = props;

  return (
    <div className={clsx('main-layout', styles.mainLayout, className)} data-testid={testingID}>
      <div className="flex h-full dark:bg-[#1F1F1F]">
        <Navigation />
        <main className="h-full flex-1 overflow-y-auto bg-secondary">{children}</main>
      </div>
    </div>
  );
}

export default React.memo(MainLayout);
