import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Style from '../assets/styles/components/modules/nav.module.scss';
import GeoLocation from '../Components/GeoLocation';

function Nav() {
  const [nav, setNav] = useState(false);

  const handleClick = () => {
    const mapWindow = window.open('', '_blank');
    mapWindow.document.write('<div id="geo-location-root"></div>');
    mapWindow.document.close();
    mapWindow.document.title = "Full Screen Map";
    mapWindow.document.body.style.margin = 0;
    mapWindow.document.body.style.height = '100vh';
    mapWindow.document.getElementById('geo-location-root').style.height = '100vh';

    ReactDOM.render(<GeoLocation />, mapWindow.document.getElementById('geo-location-root'));
  };

  return (
    <nav className={Style.nav}>
      <div className={Style.navContainer}>
        <h1>Geografisk Have</h1>
        <button className={Style['ticket-icon']} onClick={handleClick}> 1 </button>
        <div className={Style['search-icon']}>2</div>
        <div onClick={() => setNav(!nav)} className={Style['burger-menu']}>
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