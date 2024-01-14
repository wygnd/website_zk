import { $api, $apiAuth } from ".";

export async function fetchTours() {
  try {
    const { data } = await $api.get("/tours");
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function removeTour(id) {
  try {
    const { data } = await $apiAuth.post(`/tours/remove/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function createTour(name, textButton, linkButton, galleryId) {
  try {
    const { data } = await $apiAuth.post("/tours/create", {
      name,
      textButton,
      linkButton,
      galleryId,
    });
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function fetchOneTour(id) {
  try {
    const { data } = await $api.post(`/tours/tour/${id}`);
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function changeTour(id, name, textButton, linkButton, galleryId) {
  try {
    const { data } = await $apiAuth.post("/tours/change", {
      id,
      name,
      textButton,
      linkButton,
      galleryId,
    });
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function changeOne(metaKey, metaValue) {
  try {
    const { data } = await $apiAuth.post("/settings/change", {
      metaKey,
      metaValue,
    });
    return data;
  } catch (error) {
    return error.message;
  }
}
