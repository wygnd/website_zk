import { $api, $apiAuth } from ".";

export async function fetchPhones() {
    const { data } = await $apiAuth.post('/settings', { name: 'phone' });
    return data;
}

export async function fetchLogo() {
    const { data } = await $api.post('/settings', { name: 'logo' });
    return data;
}

export async function setLogo(id) {
    const { data } = await $apiAuth.post(`/settings/changeLogo/${id}`,);
    return data;
}

export async function removePhone(metaKey) {
    const { data } = await $apiAuth.post(`/settings/remove/${metaKey}`)
    return data;
}

export async function addPhone(metaValue) {
    const { data } = await $apiAuth.post(`/settings/create`, { metaKey: `phone`, metaValue })
    return data;
}

export async function changePhone(metaKey, metaValue) {
    const { data } = await $apiAuth.post(`/settings/changePhone`, { metaKey, metaValue })
    return data;
}