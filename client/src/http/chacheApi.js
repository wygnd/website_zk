import {$apiAuth} from "./index";

export const clearCache = async () => {
	try {
		const {data} = await $apiAuth.get('/cache/clear');
		return data;
	} catch(error) {
		throw error.message;
	}
}