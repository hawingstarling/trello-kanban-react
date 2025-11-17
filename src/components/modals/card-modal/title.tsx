'use client';
// import { updateCard } from '@/actions/update-card';
// import FormInput from '@/components/form/form-input';
import { Skeleton } from 'src/components/ui/skeleton';
// import { useAction } from '@/hooks/use-action';
// import { CardWithList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from 'lucide-react';
// import { useParams } from 'next/navigation';
import React, { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Input } from 'src/components/ui/input';
import FormInput from 'src/components/form/form-input';
import { Card } from 'src/types/redux.type';
import { useUpdateCard } from 'src/features/lists/useLists';

interface ICardModalTitleProps {
  data: Card;
}
const CardModalTitle = ({ data }: ICardModalTitleProps) => {

  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title, setTitle] = useState(data.title || "Untitled");
  const { mutate: updateCard } = useUpdateCard()

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;

    if (newTitle === data.title) {
      return;
    }
    updateCard({ id: data.id, title: newTitle })
    setTitle(newTitle);
  };
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
      </div>
    </div>
  );
};

CardModalTitle.Skeleton = function CardModalTitleSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardModalTitle;
