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

export async function fetchSocials() {
    const { data } = await $apiAuth.post(`/settings`, { name: 'soc' })
    return data;
}

export async function removeSocial(metaKey) {
    const { data } = await $apiAuth.post(`/settings/remove/${metaKey}`)
    return data;
}

export async function addSocial(metaValue, iconId) {
    const { data } = await $apiAuth.post(`/settings/create/`, { metaKey: 'soc', metaValue: `${metaValue}+${iconId}` })
    return data;
}

export async function changeSocial(metaKey, metaValue, imageId) {
    const { data } = await $apiAuth.post(`/settings/changePhone/`, { metaKey, metaValue: `${metaValue}+${imageId}` })
    return data;
}