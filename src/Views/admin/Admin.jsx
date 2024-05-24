import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// CSS modules
import Style from '../../assets/styles/components/modules/admin.module.scss';

function Admin() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}>
			<div className={Style.btnContainer}>
				<NavLink to='/admin'>
					<button className={Style.adminPanel}>Admin Panel</button>
				</NavLink>
				<br />
				<NavLink to='addstory'>
					<button className={Style.addStory}>Tilføj Historie</button>
				</NavLink>
			</div>

			<Outlet />
		</div>
	);
}

export default Admin;
