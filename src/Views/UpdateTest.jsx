import React, { useState } from 'react';
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

function UpdateTest() {

    const [docId, setDocId] = useState('');
	
	const [title, setTitle] = useState('');

	// need fixing perhaps  //const [img, setImg] = useState('');

	const [imgAlt, setImgAlt] = useState('');

    //Sound files for the story //const [soundFile, setSoundFile] = useState('');

    //Map location / area for story // const [mapping, setMapping] = useState(''); //Area marker for map to show area the sound story talks about. 

    /* Marker for map location, Needs to be made so client can define area, or create the different areas and then make it so they can choose them. 
        EXAMPLE:
        const polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);
    */

	const updateInDb = async (docId, title, /*img,*/ imgAlt, /*soundFile, mapping*/ ) => {
		try {
			const data = {
				title: title,
				// img: img,
				imgAlt: imgAlt,
                //soundFile: soundFile,
                //mapping: mapping,
			};

			const docRef = doc(db, 'stories', docId);
            await updateDoc(docRef, data);
			console.log('Document with ID:', docRef.id, 'Updated');

		} catch (error) {
			console.error('Error updating document:', error);
		}
	};
	
	return (
		<div className="updateStory">
			<input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
			{/* <input type="image" accept="image/*" onChange={(e) => setImg(e.target.value)} /> */}
			<input type="text" placeholder="Image Alt Text" onChange={(e) => setImgAlt(e.target.value)} />
            {/* <input type="file" accept="mp3/*" onChange={(e) => setMapping(e.target.value)} /> */}
            {/* Pre-defined area examples:
                <form> 
                    <input type="radio" id="asiaArea" name="mapLocation" value="Asiatisk Eventyr">
                    <label for="asiaArea">Asiatisk Eventyr</label>

                    <input type="radio" id="vinterSilhuet" name="mapLocation" value="Vinter Silhuet">
                    <label for="vinterSilhuet">Vinter Silhuet</label>

                    <input type="radio" id="roseHave" name="mapLocation" value="Rose Haven">
                    <label for="roseHave">Rose Haven</label>

            */}
			<button onClick={updateInDb}>Update Firestore</button>
		</div>
	);
}

export default UpdateTest;
