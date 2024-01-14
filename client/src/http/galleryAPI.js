import { $api, $apiAuth } from "./index";

export async function fetchImages(page, limit = 12) {
  try {
    const { data } = await $api.get("/gallery", {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function addImage(fileName) {
  try {
    const { data } = await $apiAuth.post("/gallery/create", fileName);
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function getImageById(id) {
  try {
    const { data } = await $apiAuth.get(`/gallery/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function removeImageByID(id) {
  try {
    const { data } = await $apiAuth.post(`/gallery/remove/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
}
