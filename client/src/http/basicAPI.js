import { $api, $apiAuth } from ".";

export async function fetchItem(metaKey) {
    const { data } = await $api.post('/settings/setting', { metaKey });
    return data;
}

export async function setItem(metaKey, metaValue) {
    const { data } = await $apiAuth.post('/settings/change', { metaKey, metaValue });
    return data;
}

export async function fetchItems(metaKey) {
    const { data } = await $api.post('/settings', { name: metaKey });
    return data;
}

export async function createItem(metaKey, metaValue) {
    const { data } = await $apiAuth.post(`/settings/create`, { metaKey, metaValue });
    return data;
}

export async function removeItem(metaKey) {
    const { data } = await $apiAuth.post(`/settings/remove/${metaKey}`);
    return data;
} 