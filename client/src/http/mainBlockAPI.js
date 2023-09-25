import { $api, $apiAuth } from './index';

export async function fetchSlides() {
    const { data } = await $api.get('/mainBlock');
    return data;
}

export async function createSlide(title, desc, buttonVisible, textButton, linkButton, galleryId) {
    const { data } = await $apiAuth.post('/mainBlock/create',
        { title, desc, buttonVisible, textButton, linkButton, galleryId });
    return data;
}

export async function saveSlide(title, desc, buttonVisible, textButton, linkButton, galleryId) {
    const { data } = await $apiAuth.post('/mainBlock/save',
        { title, desc, buttonVisible, textButton, linkButton, galleryId });
    return data;
}

export async function removeSlide(id) {
    const { data } = await $apiAuth.post(`/mainBlock/remove/${id}`);
    return data;
}