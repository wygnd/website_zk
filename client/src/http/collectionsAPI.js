import { $apiAuth } from "./index";

export async function saveBlockDesc(metaValueDesc) {
  try {
    const { dataDesc } = $apiAuth.post("/settings/change", {
      metaKey: "collectionsDesc",
      metaValue: metaValueDesc,
    });
    return { dataDesc };
  } catch (error) {
    return error.message;
  }
}

export async function saveBlockGallery(metaValueGallery) {
  try {
    const { dataGallery } = $apiAuth.post("/settings/change", {
      metaKey: "collectionsImages",
      metaValue: metaValueGallery,
    });
    return { dataGallery };
  } catch (error) {
    return error.message;
  }
}
