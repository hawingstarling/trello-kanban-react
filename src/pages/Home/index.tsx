import Page from 'src/components/page';
import clsx from 'clsx';
import React from 'react';
import ListContainer from 'src/components/board-list/container';
import { ContentWrapper } from 'src/components/content-wrapper';

interface IHomePageProps {
  className?: string;
}

const HomePage: React.FC<IHomePageProps> = ({ className }) => {
  return (
    <Page
      className={clsx(
        'home-page flex flex-col min-h-screen gap-8 w-full',
        className,
      )}
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
