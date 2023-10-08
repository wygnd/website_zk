import { $api, $apiAuth } from './index';

export async function fetchGallery() {
    const { data } = await $api.get('/galleryBlock');
    return data;
}
