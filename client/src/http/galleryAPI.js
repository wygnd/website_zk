import { $api, $apiAuth } from './index';

export async function fetchImages(page, limit = 12) {
    const { data } = await $api.get('/gallery', {
        params: {
            page,
            limit
        }
    });
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

export async function removeImageByID(id) {
    const { data } = await $apiAuth.post(`/gallery/remove/${id}`);
    return data;
}