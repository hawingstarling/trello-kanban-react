import styles from './home-page.module.scss';
import { HomePageProps } from './home-page.types';
import Page from '@components/elements/page';
import clsx from 'clsx';
import React from 'react';
import ListContainer from 'src/components/board-list/container';
import { ContentWrapper } from 'src/components/content-wrapper';

const HomePage: React.FC<HomePageProps> = ({ className, testingID }) => {
  return (
    <Page
      className={clsx(
        'home-page flex flex-col min-h-screen gap-8 w-full',
        styles.homePage,
        className,
      )}
      testingID={testingID}
    >
      <ContentWrapper className={`flex-row relative gap-4 !pt-2 !pb-0`}>
        <div className="p-4 h-full overflow-x-auto w-full">
          <ListContainer boardId="board-1" />
        </div>
      </ContentWrapper>
    </Page>
  );
};

export default React.memo(HomePage);
