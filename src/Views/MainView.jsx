import React from 'react'
import IntroText from '../Components/IntroText'
import Carousel from '../Components/Carousel'
//CSS module
import Style from "../assets/styles/components/modules/mainView.module.scss";

function MainView() {
  return (
    <div className={Style.MainView}>
      <IntroText IntroTitle={"Geografisk Have Fortæller"} IntroParagraph={`Hvad er "Geografisk Have Fortæller"? Her får du mulighed for at gå i dybden med havens mange historier på en nyn, eventyrlig måde; vælg en fortælling, tryk start og følg kortet hen til den næste destination.`}  />
      <Carousel />
    </div>
  )
}

export default MainView