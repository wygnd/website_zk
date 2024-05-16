import {$api, $apiAuth} from ".";

export async function fetchTours() {
	try {
		const {data} = await $api.get("/tours");
		return data;
	} catch(error) {
		throw error;
	}
}

export async function fetchLastTour() {
	try {
		const {data} = await $api.get("/tours/tour/6");
		return data;
	} catch(e) {
		throw e;
	}
}

export async function removeTour(id) {
	try {
		const {data} = await $apiAuth.delete(`/tours/remove/${id}`);
		return data;
	} catch(error) {
		throw error;
	}
}

export async function createTour(tour_name, textButton, linkButton, galleryId) {
	try {
		const {data} = await $apiAuth.post("/tours/create", {
			tour_name,
			textButton,
			linkButton,
			galleryId,
		});
		return data;
	} catch({response}) {
		throw response.data.message;
	}
}

export async function fetchOneTour(id) {
	try {
		const {data} = await $api.get(`/tours/tour/${id}`);
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function changeTour(id, tour_name, textButton, linkButton, galleryId) {
	try {
		const {data} = await $apiAuth.patch("/tours/change", {
			id,
			tour_name,
			textButton,
			linkButton,
			galleryId,
		});
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function changeOne(metaKey, metaValue) {
	try {
		const {data} = await $apiAuth.post("/settings/change", {
			metaKey,
			metaValue,
		});
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function saveTours(items) {
	try {
		const {data} = await $apiAuth.post("/tours/save", {items});
		return data;
	} catch(e) {
		return e.message;
	}
}
