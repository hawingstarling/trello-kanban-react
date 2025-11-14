'use client';

// import { fetcher } from '@/lib/fetcher';
// import { CardWithList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import CardModalHeader from './header';
// import CardModalDescription from './description';
// import CardModalActions from './actions';
// import CardModalActivity from './activity';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import useCardModal from '@hooks/use-card-modal';
import CardModalHeader from './header';
import { Cover } from 'src/components/cover';
import { useCard, useUpdateCardOrder } from '@hooks/lists/useLists';

const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="outline-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text[#3a3a3a] pb-2">
            Kanban Work item
          </DialogTitle>
        </DialogHeader>
        <div className="pb-40">
          <Cover />
        </div>
        {/* {cardData ? <CardModalHeader data={cardData} /> : <CardModalHeader.Skeleton />} */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <CardModalDescription data={cardData} />
              ) : (
                <CardModalDescription.Skeleton />
              )}
              {auditLogsData ? (
                <CardModalActivity items={auditLogsData} />
              ) : (
                <CardModalActivity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <CardModalActions data={cardData} /> : <CardModalActions.Skeleton />}
          {}
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
