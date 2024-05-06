import React, { useEffect, useRef, useState } from 'react'
import audioFile from '../assets/audio/dally.mp3'; 
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

import Style from '../assets/styles/components/modules/draggable.module.scss';

function Audio() {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [markerText, setMarkerText] = useState('');
  const storage = getStorage();
  const [markerLocations, setMarkerLocations] = useState([]);
  
  const audioRef = useRef(null);
  
  const onMapMount = async (e) => {
    e.preventDefault();
    
    async () => { 
    const downloadURL = await getDownloadURL(fetchTask.snapshot.ref);

    const docRef =  await getDoc(collection(db, 'stories'), {
      title: title,
      description: description,
      image: downloadURL,
      audio: audio,
      markerText: markerText,
      markerLocations: markerLocations,
    })};
  }

  useEffect(() => {
    onMapMount();
  }, []);

 
  return (
    <div className={Style.draggableWrapper}>
        <audio controls ref={audioRef}>
          <source src={audioFile} type='audio/mpeg'/>
        
        </audio>
    </div>
  )

  
}

export default Audio;