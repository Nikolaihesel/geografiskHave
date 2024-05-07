import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ticketIcon from '../image/billetIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// CSS modules
import Style from '../assets/styles/components/modules/nav.module.scss';

function Nav() {
	const [nav, setNav] = useState(false);

	const handleBurgerClick = () => {
		setNav(!nav);
		if (!nav) {
			document.querySelectorAll(`.${Style.burger}`).forEach((burger, index) => {
				switch (index) {
					case 0:
						burger.style.transform = 'rotate(45deg) translate(5px, 5px)';
						break;
					case 1:
						burger.style.opacity = '0';
						break;
					case 2:
						burger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
						break;
					default:
						break;
				}
			});
		} else {
			document.querySelectorAll(`.${Style.burger}`).forEach((burger) => {
				burger.style.transform = '';
				burger.style.opacity = '';
			});
		}
	};


	return (
		<nav>
			<div className={Style.navContainer}>
			<NavLink to='/'> {/* Wrap this line around the h1 tag */}
          <h1>Geografisk Have</h1>
        </NavLink> {/* Close NavLink here */}
				<div className={Style.ticketIcon}>
  					<img className={Style.ticketIconYellow} src={ticketIcon} alt="Ticket Icon" />
				</div>
				<div className='search-icon'>
  					<FontAwesomeIcon icon={faSearch} />
				</div>
				<div
					onClick={handleBurgerClick}
					className={Style.burgerMenu}>
					<div className={`${Style.burger} ${nav ? Style.rotateTopRight : ''}`}></div>
					<div className={`${Style.burger} ${nav ? Style.opacityZero : ''}`}></div>
					<div className={`${Style.burger} ${nav ? Style.rotateBottomRight : ''}`}></div>
				</div>
			</div>
			{nav && (
				<div className={Style.navMenu}>
					<ul>
						<NavLink
							to='map'
							onClick={() => setNav(false)}>
							<li> Map</li>
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
