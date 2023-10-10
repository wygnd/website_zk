import { $api, $apiAuth } from './index';

export async function fetchGallery() {
    const { data } = await $api.get('/galleryBlock');
    return data;
}

export async function addGalleryItem(id) {
    const { data } = await $apiAuth.post(`/galleryBlock/create`, { id });
    return data;
}

export async function removeGalleryItem(id) {
    const { data } = await $apiAuth.post(`/galleryBlock/remove/${id}`);
    return data;
}