import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// CSS module
import Style from '../assets/styles/components/modules/carouselCard.module.scss';

function CarouselCard({ StoryImg, ImgAlt, StoryTitle, StoryId }) {
	return (
	  <div className={Style.CarouselCard}>
		<img src={StoryImg} alt={ImgAlt} />
		<p>{StoryTitle}</p>
		<NavLink to={`/map/${StoryId}`}>
		  <button></button>
		</NavLink>
	  </div>
	);
  }

export default CarouselCard;
