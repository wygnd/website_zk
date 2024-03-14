import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import cl from "./MainPostHolder.module.scss";
import {ContextMain} from "../../../..";
import MainItemPreview from "../MainItemPreview/MainItemPreview";
import {FaPen} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import {removeSlide} from "../../../../http/mainBlockAPI";
import ModalSuccess from "../../ModalSuccess/ModalSuccess";
import {MAIN_BLOCK_ITEM_ROUTE} from "../../../../utils/consts";
import {useNavigate} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const MainPostHolder = observer(() => {
	const {mainBlockStore} = useContext(ContextMain);
	const [successDelete, setSuccessDelete] = useState(false);
	const historyItem = useNavigate();

	useEffect(() => {
		if(mainBlockStore.slides.length === 0) return false;
		// eslint-disable-next-line
	}, [mainBlockStore.updateSlide]);

	const removeitem = async (e) => {
		await removeSlide(e.target.dataset.item)
			.then((data) => {
				setSuccessDelete(true);
				mainBlockStore.setUpdate(!mainBlockStore.update);
				setTimeout(() => {
					setSuccessDelete(false);
				}, 2000);
			})
			.catch((error) => console.log(error));
	};

	const cliclHandlerCloseSuccessModal = () => {
		setSuccessDelete(false);
	};

	return (
		<ListGroup className="mb-4">
			{mainBlockStore.slides.map((el) => (
				<ListGroup.Item
					key={el.id}
					className={cl.mainPreviewItem}
					variant="Secondary"
				>
					<MainItemPreview
						id={el.id}
						title={el.title}
						desc={el.desc}
						buttonVisible={el.buttonVisible}
						textButton={el.textButton}
						linkButton={el.linkButton}
						galleryId={el.galleryId}
					/>
					<div className={cl.items}>
						<FaPen
							className={cl.itemChange}
							onClick={() => historyItem(MAIN_BLOCK_ITEM_ROUTE + "/" + el.id)}
						/>
						<FaTrash
							className={cl.itemDelete}
							onClick={removeitem}
							data-item={el.id}
						/>
					</div>
				</ListGroup.Item>
			))}
			<ModalSuccess
				isSuccess={successDelete}
				clickHandlerModalSuccess={cliclHandlerCloseSuccessModal}
			>
				Пост успешно удален
			</ModalSuccess>
		</ListGroup>
	);
});

export default MainPostHolder;
