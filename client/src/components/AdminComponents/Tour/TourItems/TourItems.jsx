import {observer} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {ContextMain} from '../../../..';
import TourItem from '../TourItem/TourItem';
import cl from './TourItems.module.scss';
import {FaPen, FaTrash} from 'react-icons/fa';
import ModalSuccess from '../../ModalSuccess/ModalSuccess';
import ModalError from '../../ModalError/ModalError';
import {removeTour} from '../../../../http/toursAPI';
import {useNavigate} from 'react-router-dom';
import {TOUR_BLOCK_ITEM_ROUTE} from '../../../../utils/consts';
import ListGroup from "react-bootstrap/ListGroup";
import LastItem from "../LastItem/LastItem";


const TourItems = observer(() => {

	const {tourStore} = useContext(ContextMain);
	const [modalSucc, setModalSucc] = useState(false);
	const [modalErr, setModalErr] = useState(false);
	const [messageModal, setMessageModal] = useState('');
	const historyItem = useNavigate();

	const removeItem = async (e) => {
		await removeTour(e.currentTarget.dataset.item)
			.then(data => {
				console.log(data);
				tourStore.setUpdate(!tourStore.update);
				setModalSucc(true);
				setMessageModal('Запись успешно удалена')
				setTimeout(() => {
					setModalSucc(false);
				}, 2000);
			})
			.catch(err => {
				console.log(err);
				setModalErr(true);
				setMessageModal('Что-то пошло не так')
				setTimeout(() => {
					setModalErr(false);
				}, 2000);
				return true;
			})
	}

	return (
		<>
			<ListGroup className="mb-4">
				{tourStore.tours.map(el =>
					<ListGroup.Item
						variant="Secondary"
						key={el.tour_id}
						className="d-flex align-items-center justify-content-between gap-1"
					>
						<TourItem
							className={cl.item}
							name={el.tour_name}
							textButton={el.textButton}
							linkButton={el.linkButton}
							galleryId={el.galleryId}
						/>
						<div className={cl.changedItems}>
							<FaPen
								className={cl.itemChange}
								onClick={() => historyItem(TOUR_BLOCK_ITEM_ROUTE + '/' + el.tour_id)}
							/>
							<FaTrash
								className={cl.itemDelete}
								data-item={el.tour_id}
								onClick={removeItem}
							/>
						</div>
					</ListGroup.Item>
				)}
				<ListGroup.Item>
					<LastItem />
				</ListGroup.Item>
			</ListGroup>
			<ModalSuccess isSuccess={modalSucc} clickHandlerModalSuccess={() => setModalSucc(false)}>
				{messageModal}
			</ModalSuccess>
			<ModalError isError={modalErr} clickCloseModal={() => setModalErr(false)}>
				{messageModal}
			</ModalError>
		</>
	);
});

export default TourItems;