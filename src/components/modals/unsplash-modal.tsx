import { CommandDialog, CommandEmpty, CommandGroup, CommandList, CommandItem, CommandInput, Command } from "../ui/command"
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useUnsplash } from "src/hooks/use-unsplash";
import { defaultImages } from "src/constants/images";
import { unsplashCoverImage } from "src/lib/unsplash";
import { cn } from "src/lib/utils";


export const UnsplashModal = () => {
  const isOpen = useUnsplash((store) => store.isOpen);
  const onClose = useUnsplash((store) => store.onClose);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const listUnsplashRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { pending } = useFormStatus();
  const [debounce] = useDebounceValue(query, 200);

  const unsplash = useUnsplash();

  useEffect(() => {
    if (!debounce.trim()) {
      setImages(defaultImages);
      setPage(1);
      setIsLoadingMore(true);
      return;
    }

    startTransition(async () => {
      const unsplash = await unsplashCoverImage(debounce, 1) as Array<Record<string, any>>;

      setImages(unsplash);
      setPage(2);
      setIsLoadingMore(unsplash.length === 12);
    })
  }, [debounce]);

  useEffect(() => {
    const listUnsplash = listUnsplashRef.current;
    if (!listUnsplash) return;

    const handleScroll = () => {
      if (isPending || !isLoadingMore) return;

      const { scrollTop, scrollHeight, clientHeight } = listUnsplash;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        startTransition(async () => {
          const next = await unsplashCoverImage(debounce || debounce, page);
          if (next.length > 0) {
            setImages((prev) => [...prev, ...next]);
            setPage((prev) => prev + 1);
          } else {
            setIsLoadingMore(false);
          }
        });
      }
    }
    listUnsplash.addEventListener("scroll", handleScroll);
    return () => listUnsplash.removeEventListener("scroll", handleScroll)
  }, [debounce, isPending, isLoadingMore, page]);

  const handleSelect = (image: any) => {
    setSelectedImageId(image.id);

    if (unsplash.onSelect) {
      unsplash.onSelect(image.urls.full);
    }

    unsplash.onClose();
  }

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) unsplash.onClose();
      }}
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={`Search themes Unsplash...`}
          value={query}
          onValueChange={(q) => setQuery(q)}
        />
        <CommandList ref={listUnsplashRef}>
          {isPending && (
            <div className="p-6 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
          )}
          {!isPending && images.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          <CommandGroup heading="Organization Cover">
            <div className="relative">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {images &&
                  images.map((image, index) => (
                    <CommandItem
                      key={image.id}
                      value={`${image.id}-${index}`}
                      className={cn(
                        'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                        pending && 'opacity-50 hover:opacity-50 cursor-auto',
                      )}
                      onClick={() => {
                        if (pending) return;
                        handleSelect(image);
                      }}
                    >
                      <input
                        type="radio"
                        id={'image'}
                        name={'image'}
                        className="hidden"
                        checked={selectedImageId === image.id}
                        disabled={pending}
                        value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        readOnly
                      />
                      <div className="relative w-full h-full">
                        <img
                          src={image.urls.thumb}
                          alt="Unsplash image"
                          className="object-cover rounded-sm absolute inset-0 w-full h-full"
                        />
                      </div>
                      {selectedImageId === image.id && (
                        <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <a
                        href={image.links.html}
                        target="_blank"
                        className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                      >
                        {image.user.name}
                      </a>
                    </CommandItem>
                  ))}
              </div>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
