import React, {useContext} from 'react';
import cl from './MainItemPreview.module.scss';
import styles from "../MainPostHolder/MainPostHolder.module.scss";
import {Reorder, useDragControls} from "framer-motion";
import {FaPen, FaTrash} from "react-icons/fa";
import {MAIN_BLOCK_ITEM_ROUTE} from "../../../../utils/consts";
import {removeSlide} from "../../../../http/mainBlockAPI";
import {useNavigate} from "react-router-dom";
import {ContextMain} from "../../../../index";
import ListGroup from "react-bootstrap/ListGroup";
import {MdDragIndicator} from "react-icons/md";

const MainItemPreview = ({item}) => {
	
	const {title, id} = item;
	const {galleryStore} = useContext(ContextMain);
	const controls = useDragControls()
	
	const removeItem = async (e) => {
		await removeSlide(e.target.dataset.item)
			.then(() => {
				galleryStore.callModalSuccess("Запись успешно удалена")
			})
			.catch((error) => {
				galleryStore.callModalError(`Что-то пошло не так. ${error?.message}`)
			});
	};
	
	const historyItem = useNavigate();
	
	
	return (
		<Reorder.Item
			className={cl.list__item}
			value={item}
			dragListener={false}
			dragControls={controls}
			whileDrag={{
				scale: 1.05,
				opacity: .8
			}}
		>
			<ListGroup.Item className={styles.mainPreviewItem}>
				<div className={cl.titleHead}>
					<span className={cl.titleOrder} onPointerDown={(e) => controls.start(e)}>
						<MdDragIndicator size={24}/>
					</span>
					<div className={cl.titleItem}>{title}</div>
				</div>
				<div className={styles.items}>
					<FaPen
						className={styles.itemChange}
						onClick={() => historyItem(MAIN_BLOCK_ITEM_ROUTE + "/" + id)}
					/>
					<FaTrash
						className={styles.itemDelete}
						onClick={removeItem}
						data-item={id}
					/>
				</div>
			</ListGroup.Item>
		</Reorder.Item>
	);
};

export default MainItemPreview;