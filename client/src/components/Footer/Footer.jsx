import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import cl from "./Footer.module.scss";
import {ContextMain} from "../..";
import ModalError from "../AdminComponents/ModalError/ModalError";
import ModalSuccess from "../AdminComponents/ModalSuccess/ModalSuccess";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";

const Footer = observer(() => {
	const {galleryStore, basicStore} = useContext(ContextMain);
	
	return (
		<>
			<div id={cl.footer} onClick={() => galleryStore.setModal(true)}>
				<Container>
					<div className={cl.footerHolder}>
						<p className={cl.comment}>
							Проект реализуется при поддержке Президентского фонда культурных
							инициатив.
						</p>
						<div className={cl.copyWrite}>© {new Date().getFullYear()} Заречный квартал</div>
					</div>
				</Container>
			</div>
			<ModalError
				isError={galleryStore.modalErr}
				clickCloseModal={() => galleryStore.setModalErr(false)}
			>
				{galleryStore.messageModal}
			</ModalError>
			<ModalSuccess
				isSuccess={galleryStore.modalSucc}
				clickHandlerModalSuccess={() => galleryStore.setModalSucc(false)}
			>
				{galleryStore.messageModal}
			</ModalSuccess>
			{basicStore.loading && (
				<Loading title="Загрузка..."/>
			)}
		</>
	);
});

export default Footer;
