import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ticketIcon from '../image/billetIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// CSS modules
import Style from '../assets/styles/components/modules/nav.module.scss';

function Nav() {
	const [nav, setNav] = useState(false);
	return (
		<nav>
			<div className={Style.navContainer}>
				<h1>Geografisk Have</h1>
				<div className={Style.ticketIcon}>
  					<img className={Style.ticketIconYellow} src={ticketIcon} alt="Ticket Icon" />
				</div>
				<div className='search-icon'>
  					<FontAwesomeIcon icon={faSearch} />
				</div>
				<div
					onClick={() => setNav(!nav)}
					className='burger-menu'>
					<div className={Style.burger}></div>
				</div>
			</div>
			{nav && (
				<div className={Style.navMenu}>
					<ul>
						<NavLink
							to='map'
							onClick={() => setNav(false)}>
							<li> map</li>
						</NavLink>
						<NavLink
							to='/'
							onClick={() => setNav(false)}>
							<li> Home</li>
						</NavLink>

						<li>Services</li>
						<li>Contact</li>
					</ul>
				</div>
			)}
		</nav>
	);
}

export default Nav;
