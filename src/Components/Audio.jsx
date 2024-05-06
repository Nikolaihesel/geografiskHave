import React, { useRef } from 'react'
import audioFile from '../assets/audio/dally.mp3'; 

import Style from '../assets/styles/components/modules/draggable.module.scss';

function Audio() {
  const audioRef = useRef(null);
  return (
    <div className={Style.draggableWrapper}>
        <audio controls ref={audioRef}>
          <source src={audioFile} type='audio/mpeg'/>
        
        </audio>
    </div>
  )

  
}

export default Audio;