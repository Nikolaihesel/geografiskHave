import React, { useState} from 'react'
// CSS module
import Style from "../assets/styles/components/modules/carouselCard.module.scss";

function CarouselCard({StoryImg, ImgAlt, StoryTitle, }) {
  return (
    <div className={Style.CarouselCard}>
        <img src={StoryImg} alt={ImgAlt} />
        <p>{StoryTitle}</p>
        <button></button>
    </div>
  )
}

export default CarouselCard;