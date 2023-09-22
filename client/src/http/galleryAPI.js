import { $api, $apiAuth } from './index';

export async function fetchImages() {
    return $api.get('/gallery');
}

export async function addImage(fileName) {
    const { data } = await $apiAuth.post('/gallery/create', fileName);
    return data;
}