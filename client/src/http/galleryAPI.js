import { $api, $apiAuth } from './index';

export async function fetchImages() {
    const { data } = await $api.get('/gallery');
    return data;
}

export async function addImage(fileName) {
    const { data } = await $apiAuth.post('/gallery/create', fileName);
    return data;
}

export async function getImageById(id) {
    const { data } = await $apiAuth.get(`/gallery/${id}`);
    return data;
}