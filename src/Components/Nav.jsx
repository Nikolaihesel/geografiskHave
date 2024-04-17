import React, { useState } from 'react';
// CSS modules
import Style from '../assets/styles/components/modules/nav.module.scss';

function Nav() {
	const [nav, setNav] = useState(false);
	return (
		<nav>
			<div className={Style.navContainer}>
				<h1>Geografisk Have</h1>
				<div className='ticket-icon'>1</div>
				<div className='search-icon'>2</div>
				<div
					onClick={() => setNav(!nav)}
					className='burger-menu'>
					<div className={Style.burger}></div>
				</div>
			</div>
			{nav && (
				<div className={Style.navMenu}>
					<ul>
						<li>Home</li>
						<li>About</li>
						<li>Services</li>
						<li>Contact</li>
					</ul>
				</div>
			)}
		</nav>
	);
}

export default Nav;
