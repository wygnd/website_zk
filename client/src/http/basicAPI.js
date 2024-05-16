import {$api, $apiAuth} from ".";

export async function fetchItem(metaKey) {
  try {
    const {data} = await $api.get(`/settings/setting/${metaKey}`);
    return data;
  } catch(error) {
    throw error.message;
  }
}

export async function setItem(metaKey, metaValue) {
  try {
    const {data} = await $apiAuth.post("/settings/change", {
      metaKey,
      metaValue,
    });
    return data;
  } catch(error) {
    throw error.message;
  }
}

export async function fetchItems(metaKey) {
  try {
    return await $api.get(`/settings/before/${metaKey}`);
  } catch(error) {
    throw error;
  }
}

export async function createItem(metaKey, metaValue) {
  try {
    const {data} = await $apiAuth.post(`/settings/create`, {
      metaKey,
      metaValue,
    });
    return data;
  } catch(error) {
    throw error.message;
  }
}

export async function removeItem(metaKey) {
  try {
    const {data} = await $apiAuth.delete(`/settings/remove/${metaKey}`);
    return data;
  } catch(error) {
    throw error.message;
  }
}
