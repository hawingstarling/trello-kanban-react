import styles from './not-found-page.module.scss';
import Page from 'src/components/page';
import clsx from 'clsx';
import React from 'react';

interface INotFoundPageProps {
  className?: string;
}

function NotFoundPage(props: INotFoundPageProps) {
  const { className } = props;

  return (
    <Page
      className={clsx(
        'not-found-page flex flex-col justify-center items-center relative min-h-screen bg-gray-50 dark:bg-gray-900 px-4',
        className,
      )}
    >
      <h1 className="text-9xl sm:text-[12rem] font-extrabold text-gray-900 dark:text-white tracking-widest animate-bounce">
        404
      </h1>
      <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg text-lg sm:text-2xl transform rotate-3">
        Page Not Found
      </div>
      <p className="mt-8 text-gray-700 dark:text-gray-300 text-center max-w-md sm:text-lg">
        Page Not Found Description
      </p>
    </Page>
  );
}

export default React.memo(NotFoundPage);
