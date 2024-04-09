import React from 'react';
// CSS modules
import Style from "../assets/styles/components/modules/nav.module.scss";

function Nav() {
  return (
    <nav className={Style.nav}>
        <h1>Geografisk Have</h1>
        <div className='ticket-icon'>1</div>
        <div className='search-icon'>2</div>
        <div className='burger-menu'>3</div>
    </nav>
  )
}

export default Nav