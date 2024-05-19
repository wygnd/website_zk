import React, {useContext} from 'react';
import cl from './TourItem.module.scss';
import {FaPen, FaTrash} from "react-icons/fa";
import {TOUR_BLOCK_ITEM_ROUTE} from "../../../../utils/consts";
import {removeTour} from "../../../../http/toursAPI";
import styles from '../TourItems/TourItems.module.scss';
import {ContextMain} from "../../../../index";
import {useNavigate} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import {Reorder, useDragControls} from "framer-motion";
import {MdDragIndicator} from "react-icons/md";
import {observer} from "mobx-react-lite";


const TourItem = observer(({item}) => {
	
	const {tour_name, tour_id} = item;
	const {tourStore, galleryStore} = useContext(ContextMain);
	const historyItem = useNavigate();
	const controls = useDragControls()
	
	const removeItem = async (e) => {
		await removeTour(e.currentTarget.dataset.item)
			.then(() => {
				tourStore.setUpdate(!tourStore.update);
				galleryStore.callModalSuccess('Запись успешно удалена');
			})
			.catch(err => {
				galleryStore.callModalError("Что-то пошло не так" + err);
				return true;
			})
	}
	
	return (
		<Reorder.Item
			value={item}
			className="mb-2"
			dragListener={false}
			dragControls={controls}
		>
			<ListGroup.Item variant="Secondary" className="d-flex align-items-center justify-content-between gap-1">
				<div className={cl.item__header}>
					<MdDragIndicator size="24" className={cl.item__drag} onPointerDown={(e) => controls.start(e)}/>
					{tour_name &&
						<div className={cl.name}>{tour_name}</div>
					}
				</div>
				<div className={styles.changedItems}>
					<FaPen
						className={styles.itemChange}
						onClick={() => historyItem(TOUR_BLOCK_ITEM_ROUTE + '/' + tour_id)}
					/>
					<FaTrash
						className={styles.itemDelete}
						data-item={tour_id}
						onClick={removeItem}
					/>
				</div>
			</ListGroup.Item>
		</Reorder.Item>
	);
});

export default TourItem;