import React, {useContext, useEffect, useState} from 'react';
import cl from './SocialItem.module.scss';
import {observer} from 'mobx-react-lite';
import {getImageById} from '../../../http/galleryAPI';
import {BsFillTrashFill} from 'react-icons/bs';
import {FaPen} from 'react-icons/fa';
import {setItem, removeItem} from '../../../http/basicAPI';
import {ContextMain} from '../../..';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import Button from '../../Button';
import ModalGallery from '../ModalGallery/ModalGallery';

const SocialItem = observer(({el}) => {
	
	const {iconId, metaKey, metaValue} = el;
	const {basicStore, galleryStore} = useContext(ContextMain);
	const [id, setId] = useState(null);
	const [icon, setIcon] = useState(null);
	const [modal, setModal] = useState(false);
	const [itemValue, setItemValue] = useState(null);
	const [modalGallery, setModalGallery] = useState(false);
	
	useEffect(() => {
		setId(iconId);
		setItemValue(metaValue);
		
		if(!id) return;
		getImageById(id)
			.then(data => {
				setIcon(data);
			});
	}, [basicStore.update, id])
	
	
	const removeItemHandler = async () => {
		await removeItem(metaKey)
			.then(data => {
				basicStore.setUpdate(!basicStore.update)
				galleryStore.callModalSuccess(data.message);
			})
			.catch(error => {
				galleryStore.callModalError(error.message);
			});
	}
	
	const clickSaveItem = async () => {
		await setItem(metaKey, `${itemValue}+${iconId}`)
			.then(() => {
				basicStore.setUpdate(!basicStore.update)
				setModal(false);
				galleryStore.callModalSuccess('Соц. сеть успешно изменена');
			})
	}
	
	return (
		<>
			<div className={cl.socItemHolder}>
				<div className={cl.socItem}>
					{icon &&
						<img src={icon.file_path} alt={icon.file_name}/>
					}
					<div className={cl.linkItem}>{itemValue}</div>
				</div>
				<FaPen
					size={25}
					className={cl.changeSoc}
					onClick={() => setModal(true)}
				/>
				<BsFillTrashFill
					size={25}
					className={cl.deleteSoc}
					onClick={removeItemHandler}
				/>
				<Modal
					open={modal}
					clickHandler={() => setModal(false)}
				>
					<div className={cl.modalHolder}>
						{icon &&
							<img
								src={icon.file_path}
								onClick={() => setModalGallery(true)}
								alt={icon.file_name}
							/>
						}
						<Input
							placeholder={itemValue}
							value={itemValue}
							onChange={(e) => setItemValue(e.target.value)}
						/>
						<Button onClick={clickSaveItem}>Сохранить</Button>
					</div>
				
				
				</Modal>
			</div>
			<ModalGallery
				open={modalGallery}
				clickHandler={() => setModalGallery(false)}
				setOpen={() => setModalGallery(false)}
				getImageId={(id) => setId(id)}
			/>
		</>
	);
});

export default SocialItem;