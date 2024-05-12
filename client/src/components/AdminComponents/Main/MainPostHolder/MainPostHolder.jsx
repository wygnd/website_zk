import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import cl from "./MainPostHolder.module.scss";
import {ContextMain} from "../../../..";
import MainItemPreview from "../MainItemPreview/MainItemPreview";
import {fetchSlides, saveSlides} from "../../../../http/mainBlockAPI";
import {Reorder} from "framer-motion";
import ListGroup from "react-bootstrap/ListGroup";

const MainPostHolder = observer(() => {
	const {mainBlockStore} = useContext(ContextMain);
	const [posts, setPosts] = useState(null);
	
	useEffect(() => {
		if(mainBlockStore.slides.length === 0) {
			fetchSlides().then((data) => {
				if(data.length === 0) {
					mainBlockStore.setSlides([]);
					return false;
				}
				mainBlockStore.setSlides(data);
				setPosts(data);
			});
		} else {
			setPosts(mainBlockStore.slides);
		}
	}, [mainBlockStore.slides]);
	
	if(!posts) {
		return null;
	}
	
	const handleDragEnd = async () => {
		posts.map((t, index) => {
			t.order = index;
		})
		mainBlockStore.setSlides(posts);
		try {
			await saveSlides(posts);
		} catch(err) {
			console.log(err);
		}
	}
	
	return (
		<ListGroup className={cl.items__list}>
			<Reorder.Group
				axis="y"
				values={posts}
				onReorder={setPosts}
				className="mb-4 p-0"
				whileDrag={{
					scale: 1.05,
					opacity: .6
				}}
				onPanEnd={handleDragEnd}
			>
				{posts.map((el, index) => (
					<MainItemPreview
						key={el.id}
						variant="Secondary"
						className={cl.mainPreviewItem}
						item={el}
						index={index}
					/>
				))}
			</Reorder.Group>
		</ListGroup>
	);
});

export default MainPostHolder;
