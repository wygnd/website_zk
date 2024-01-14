import { $apiAuth } from "./index";

export async function saveBlockDesc(metaValue) {
  try {
    const { data } = $apiAuth.post("/settings/change", {
      metaKey: "aboutDesc",
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
      metaKey: "aboutImage",
      metaValue,
    });
    return { data };
  } catch (error) {
    return error.message;
  }
}
