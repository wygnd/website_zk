import { $apiAuth } from './index';

export async function saveBlockDesc(metaValueDesc) {
    const { dataDesc } = $apiAuth.post('/settings/change', { metaKey: "collectionsDesc", metaValue: metaValueDesc })
    return { dataDesc };
}

export async function saveBlockGallery(metaValueGallery) {
    const { dataGallery } = $apiAuth.post('/settings/change', { metaKey: "collectionsImages", metaValue: metaValueGallery })
    return { dataGallery };
}
