import { $api, $apiAuth } from "./index";

export async function fetchGallery() {
  try {
    const { data } = await $api.get("/galleryBlock");
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function addGalleryItem(id) {
  try {
    const { data } = await $apiAuth.post(`/galleryBlock/create`, { id });
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function removeGalleryItem(id) {
  try {
    const { data } = await $apiAuth.post(`/galleryBlock/remove/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
}
