import { $api, $apiAuth } from ".";

export async function fetchTours() {
    const { data } = await $api.get('/tours');
    return data;
}

export async function removeTour(id) {
    const { data } = await $apiAuth.post(`/tours/remove/${id}`);
    return data;
}

export async function createTour(name, textButton, linkButton, galleryId) {
    const { data } = await $apiAuth.post('/tours/create', { name, textButton, linkButton, galleryId });
    return data;
}

export async function fetchLastItem(metaKey) {
    const { data } = await $api.post('/settings', { metaKey });
    return data;
}