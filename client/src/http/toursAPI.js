import { $api } from ".";

export async function fetchTours() {
    const { data } = await $api.get('/tours');
    return data;
}