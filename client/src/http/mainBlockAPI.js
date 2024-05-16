import {$api, $apiAuth} from "./index";

export async function fetchSlides() {
	try {
		const {data} = await $api.get("/mainBlock");
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function createSlide(
	title,
	desc,
	buttonVisible,
	textButton,
	linkButton,
	galleryId
) {
	try {
		const {data} = await $apiAuth.post("/mainBlock/create", {
			title,
			desc,
			buttonVisible,
			textButton,
			linkButton,
			galleryId,
		});
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function saveSlide(
	id,
	title,
	desc,
	buttonVisible,
	textButton,
	linkButton,
	galleryId
) {
	try {
		const {data} = await $apiAuth.post("/mainBlock/save", {
			id,
			title,
			desc,
			buttonVisible,
			textButton,
			linkButton,
			galleryId,
		});
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function saveSlides(items) {
	try {
		const {data} = await $apiAuth.post(`/mainBlock/save/slides`, {
			items
		});
		
		return data;
	} catch(e) {
		return e.message;
	}
}

export async function removeSlide(id) {
	try {
		const {data} = await $apiAuth.post(`/mainBlock/remove/${id}`);
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function fetchOneSlide(id) {
	try {
		const {data} = await $apiAuth.get(`/mainBlock/${id}`);
		return data;
	} catch(error) {
		return error.message;
	}
}
