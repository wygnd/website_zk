import { $apiAuth } from "./index";

export async function saveBlockDesc(metaValue) {
  try {
    const { data } = $apiAuth.post("/settings/change", {
      metaKey: "about_desc",
      metaValue,
    });
    return { data };
  } catch (error) {
    return error.message;
  }
}

export async function saveBlockGallery(metaValue) {
  try {
    const { data } = $apiAuth.post("/settings/change", {
      metaKey: "about_image",
      metaValue,
    });
    return { data };
  } catch (error) {
    return error.message;
  }
}
