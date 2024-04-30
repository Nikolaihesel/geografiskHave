import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// CSS modules
import Style from "../../assets/styles/components/modules/admin.module.scss";

function Admin() {
	return (
		<div>
			<div className={Style.btnContainer}>
				<NavLink to='/admin'>
					<button className={Style.adminPanel}>Admin panel</button>
				</NavLink>
				<br />
				<NavLink to='addstory'>
					<button className={Style.addStory}>Add Story</button>
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
}

export default Admin;
