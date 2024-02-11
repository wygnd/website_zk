import { $apiAuth } from "./index";

export async function saveBlockDesc(metaValueDesc) {
  try {
    const { dataDesc } = $apiAuth.post("/settings/change", {
      metaKey: "collections_desc",
      metaValue: metaValueDesc,
    });
    return { dataDesc };
  } catch (error) {
    return error.message;
  }
}

export async function saveBlockGallery(metaValueGallery) {
  try {
    const { dataGallery } = await $apiAuth.post("/settings/change", {
      metaKey: "collections_images",
      metaValue: metaValueGallery,
    });
    return { dataGallery };
  } catch (error) {
    return error.message;
  }
}
