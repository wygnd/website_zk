import { $api, $apiAuth } from './index';

export async function fetchSlides() {
    const { data } = await $api.get('/mainBlock');
    return data;
}