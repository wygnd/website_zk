import { $apiAuth } from './index';

export async function saveBlockDesc(metaValue) {
    const { data } = $apiAuth.post('/settings/change', { metaKey: "aboutDesc", metaValue})
    return { data };
}

export async function saveBlockGallery(metaValue) {
    const { data } = $apiAuth.post('/settings/change', { metaKey: "aboutImage", metaValue })
    return { data };
}
