
import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY!,
});

export async function unsplashCoverImage(query: string, page: number = 1) {
  const unsplashCover = await unsplash.search.getPhotos({
    query,
    perPage: 12,
    page,
    orientation: "landscape",
  })

  if (unsplashCover.errors) {
    console.error("Failed to get images from Unsplash with error ", unsplashCover.errors);
    return []
  }
  return unsplashCover.response?.results ?? []
}
