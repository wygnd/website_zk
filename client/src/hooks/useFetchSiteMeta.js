import {useContext, useEffect} from "react";
import {ContextMain} from "../index";
import {fetchItem} from "../http/basicAPI";

export function useFetchSiteMeta() {
	const {basicStore} = useContext(ContextMain);
	
	useEffect(() => {
		if(!basicStore.siteTitle) {
			fetchItem("siteTitle").then((data) => {
				basicStore.setSiteTitle(data.metaValue);
			});
		}
		
		if(!basicStore.siteDesc) {
			fetchItem("siteDesc").then((data) => {
				basicStore.setSiteDesc(data.metaValue);
			});
		}
		
		if(!basicStore.footerDesc) {
			fetchItem('footer_desc').then(data => {
				basicStore.setFooterDesc(data.metaValue);
			})
		}
		
		if(!basicStore.copyright) {
			fetchItem('footer_copyright').then(data => {
				basicStore.setCopyright(data.metaValue);
			})
		}
	}, []);
}