import React from 'react';
import styles from "./Admin.module.scss";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


const AdminTabs = ({tabs = [], contents = []}) => {
	
	return (
		<Tabs
			disableUpDownKeys={true}
			focusTabOnClick={false}
			selectedTabClassName={styles.admin__holder_navigation_item__active}
			selectedTabPanelClassName={styles.admin__holder_content__active}
			className={styles.admin__holder}
		>
			{tabs.length !== 0 &&
				<TabList className={styles.admin__holder_navigation}>
					{tabs.map(tab =>
						<Tab className={styles.admin__holder_navigation_item} key={tab.id}>
							{tab?.icon}
							{tab?.text}
						</Tab>
					)}
				</TabList>
			}
			{contents.length !== 0 &&
				contents.map(c =>
					<TabPanel className={styles.admin__holder_content} key={c.id}>
						{c.content}
					</TabPanel>
				)}
		</Tabs>
	);
};

export default AdminTabs;