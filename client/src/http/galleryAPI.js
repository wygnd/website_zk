import {$api, $apiAuth} from "./index";
import {SERVER_URL} from "../utils/consts";

export function createFilePath(file_name, file_ext, size = "large") {
	const first2Letters = file_name.substring(0, 2);
	const second2Letters = file_name.substring(2, 4);
	
	if(size === "full") {
		return `${SERVER_URL}/${first2Letters}/${second2Letters}/${file_name}${file_ext}`;
	} else if(size === "medium") {
		return `${SERVER_URL}/${first2Letters}/${second2Letters}/${file_name}_300${file_ext}`;
	} else if(size === "thumbnail") {
		return `${SERVER_URL}/${first2Letters}/${second2Letters}/${file_name}_150${file_ext}`;
	} else {
		return `${SERVER_URL}/${first2Letters}/${second2Letters}/${file_name}_1024${file_ext}`;
	}
}

export async function fetchImages(page, limit = 12) {
	try {
		const {data} = await $api.get("/gallery", {
			params: {
				page,
				limit,
			},
		});
		const {rows, ...fields} = data;
		let result = {...fields, gallery: []};
			// eslint-disable-next-line
		rows.map(el => {
			const file_path = createFilePath(el.file_name, el.file_ext, 'thumbnail');
			result.gallery.push({...el, file_path});
		})
		return result;
	} catch(error) {
		return error.message;
	}
}

export async function addImage(file) {
	try {
		const {data} = await $apiAuth.post("/gallery/create", file, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return data;
	} catch(error) {
		return error.message;
	}
}

export async function getImageById(id, size = "large") {
	try {
		const {data} = await $api.get(`/gallery/${id}`);
		const file_path = createFilePath(data.file_name, data.file_ext, size);
		return {...data, file_path}
	} catch(error) {
		return error.message;
	}
}

export async function removeImageByID(id) {
	try {
		const {data} = await $apiAuth.post(`/gallery/remove/${id}`);
		return data;
	} catch(error) {
		return error.message;
	}
}
