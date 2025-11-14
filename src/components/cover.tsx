import { cn } from 'src/lib/utils';
import { Button } from './ui/button';
import { ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface CoverImageProps {
  url?: string | null;
  onUpdate?: (url: string) => void;
  onRemove?: () => void;
}

export const Cover = ({ url, onUpdate, onRemove }: CoverImageProps) => {
  const [imageUrl, setImageUrl] = useState(url || '');

  const handleChange = () => {
    const newUrl = prompt('Enter new cover URL:', imageUrl);
    if (newUrl && onUpdate) {
      setImageUrl(newUrl);
      onUpdate(newUrl);
    }
  };

  const handleRemove = () => {
    setImageUrl('');
    if (onRemove) onRemove();
  };

  return (
    <div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh]', url && 'bg-muted')}>
      {!!imageUrl && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={imageUrl}
            alt="cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      {imageUrl && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={handleChange}
            className="to-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={handleRemove}
            className="to-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
