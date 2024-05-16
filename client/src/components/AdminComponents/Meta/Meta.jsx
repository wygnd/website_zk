import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {ContextMain} from "../../..";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styles from "./Meta.module.scss";
import {setItem} from "../../../http/basicAPI";

const Meta = observer(() => {
	const {basicStore, galleryStore} = useContext(ContextMain);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [footerDesc, setFooterDesc] = useState("");
	const [copyright, setCopyright] = useState("");
	const [valid, setValid] = useState(false);
	
	useEffect(() => {
		setTitle(basicStore.siteTitle);
		setDesc(basicStore.siteDesc);
		setFooterDesc(basicStore.footerDesc);
		setCopyright(basicStore.copyright);
	}, []);
	
	const handlerSubmit = async (event) => {
		try {
			event.preventDefault();
			event.stopPropagation();
			const form = event.currentTarget;
			if(form.checkValidity() === false) {
				setValid(false);
			}
			
			if(
				title === basicStore?.siteTitle &&
				desc === basicStore?.siteDesc &&
				footerDesc === basicStore?.footerDesc &&
				copyright === basicStore?.copyright
			) {
				galleryStore.callModalSuccess("Ничего не изменено");
				return;
			}
			
			const updatedTitle = await setItem("siteTitle", title);
			const updatedDesc = await setItem("siteDesc", desc);
			const updatedFooterDesc = await setItem("footer_desc", footerDesc);
			const updatedCopyright = await setItem("copyright", copyright);
			
			basicStore.setSiteTitle(updatedTitle.metaValue);
			basicStore.setSiteDesc(updatedDesc.metaValue);
			basicStore.setFooterDesc(updatedFooterDesc.metaValue);
			basicStore.setCopyright(updatedCopyright.metaValue);
			setValid(true);
			galleryStore.callModalSuccess("Информация о сайте успешно изменена");
		} catch(error) {
			galleryStore.callModalError(`Что-то пошло не так, ${error}`);
		}
	};
	
	return (
		<Form
			type="invalid"
			className={styles.meta_holder}
			validated={valid}
			onSubmit={handlerSubmit}
		>
			<Form.Group
				type="invalid"
				tooltip="true"
				className="mb-3"
				controlId="validationTitle"
			>
				<InputGroup hasValidation>
					<InputGroup.Text id="site-title" style={{width: 160, alignItems: "flex-start"}}>Название
						сайта</InputGroup.Text>
					<Form.Control
						type="text"
						required
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						placeholder="Название сайта"
						aria-describedby="site-title"
					/>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3" controlId="validationDesc">
				<InputGroup hasValidation>
					<InputGroup.Text id="site-desc" style={{width: 160, alignItems: "flex-start"}}>Описание
						сайта</InputGroup.Text>
					<Form.Control
						as="textarea"
						style={{height: "100px", resize: "none"}}
						onChange={(e) => setDesc(e.target.value)}
						value={desc}
						placeholder="Описание сайта"
						required
						aria-describedby="site-desc"
					/>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3" controlId="validationFooterDesc">
				<InputGroup hasValidation>
					<InputGroup.Text id="site-footer-desc" style={{width: 160, alignItems: "flex-start"}}>Описание в
						футере</InputGroup.Text>
					<Form.Control
						as="textarea"
						style={{height: "100px", resize: "none"}}
						onChange={(e) => setFooterDesc(e.target.value)}
						value={footerDesc}
						placeholder="Описание в футере"
						required
						aria-describedby="site-footer-desc"
					/>
				</InputGroup>
			</Form.Group>
			<Form.Group className="mb-3" controlId="validationCopyright">
				<InputGroup hasValidation>
					<InputGroup.Text id="site-copyright" style={{width: 160, alignItems: "flex-start"}}>Копирайт</InputGroup.Text>
					<Form.Control
						as="textarea"
						style={{height: "100px", resize: "none"}}
						onChange={(e) => setCopyright(e.target.value)}
						value={copyright}
						placeholder="Копирайт"
						required
						aria-describedby="site-copyright"
					/>
				</InputGroup>
			</Form.Group>
			<Button type="submit" style={{marginLeft: "auto"}}>
				Сохранить изменения
			</Button>
		</Form>
	);
});

export default Meta;
