import React from 'react'

// CSS modules
import Style from "../assets/styles/components/modules/introText.module.scss";

function IntroText({IntroTitle, IntroParagraph}) {
  return (
    <div className={Style.IntroText}>
        <h1>{IntroTitle}</h1>
        <p>{IntroParagraph}</p>
    </div>
  )
}

export default IntroText