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

export async function saveSlide(id, title, desc, buttonVisible, textButton, linkButton, galleryId) {
    const { data } = await $apiAuth.post('/mainBlock/save',
        {id, title, desc, buttonVisible, textButton, linkButton, galleryId });
    return data;
}

export async function removeSlide(id) {
    const { data } = await $apiAuth.post(`/mainBlock/remove/${id}`);
    return data;
}

export async function fetchOneSlide(id) {
    const { data } = await $apiAuth.get(`/mainBlock/${id}`);
    return data;
}