import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function Admin() {
	return (
		<div>
			<div className='btn-container'>
				<NavLink to='/admin'>
					<button>Admin panel</button>
				</NavLink>
				<br />
				<NavLink to='addstory'>
					<button>Add Story</button>
				</NavLink>

				<button>Delete Story</button>
			</div>
			<Outlet />
		</div>
	);
}

export default Admin;
