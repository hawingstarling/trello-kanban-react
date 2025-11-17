'use client';

// import { CardWithList } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import CardModalHeader from './header';
// import CardModalDescription from './description';
// import CardModalActions from './actions';
// import CardModalActivity from './activity';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import CardModalHeader from './title';
import { Cover } from 'src/components/cover';
import useCardModal from 'src/hooks/use-card-modal';
import { useCard } from 'src/features/lists/useLists';
import CardModalTitle from './title';
import CardModalDescription from './description';

const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal();

  const { data: cardData } = useCard(id ?? "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="outline-none max-w-4xl! w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text[#3a3a3a] pb-2">
            Update Work item
          </DialogTitle>
        </DialogHeader>
        {cardData ? <CardModalTitle data={cardData} /> : <CardModalTitle.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <CardModalDescription data={cardData} />
              ) : (
                <CardModalDescription.Skeleton />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
