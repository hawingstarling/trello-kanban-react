import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import React, { ElementRef, KeyboardEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from 'src/components/ui/button';
import { Skeleton } from 'src/components/ui/skeleton';
import { useUpdateCard } from 'src/features/lists/useLists';
import { Card } from 'src/types/redux.type';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from 'src/components/ui/form';
import { Textarea } from 'src/components/ui/textarea';

const cardDescriptionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

type CardDescriptionForm = z.infer<typeof cardDescriptionSchema>;

interface ICardModalDescriptionProps {
  data: Card;
}

const CardModalDescription = ({ data }: ICardModalDescriptionProps) => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateCard } = useUpdateCard();

  const form = useForm<CardDescriptionForm>({
    resolver: zodResolver(cardDescriptionSchema),
    defaultValues: {
      description: data.description ?? '',
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    form.reset({ description: data.description ?? '' });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (formData: CardDescriptionForm) => {
    if (formData.description === data.description) {
      disableEditing();
      return;
    }

    updateCard(
      {
        id: data.id,
        description: formData.description,
      },
      {
        onSuccess: () => {
          toast.success('Description updated successfully');
        },
        onError: (error) => {
          toast.error('Failed to update description');
        },
      },
    );

    disableEditing();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="space-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textareaRef}
                        className="w-full mt-2"
                        onKeyDown={onTextAreaKeyDown}
                        placeholder="Add a more detailed description"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant="ghost"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  );
};

CardModalDescription.Skeleton = function CardModalDescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardModalDescription;
