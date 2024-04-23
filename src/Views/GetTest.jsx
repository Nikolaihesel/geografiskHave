import React, { useState } from 'react';
import { collection, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';

function GetTest() {
	
	const [title, setTitle] = useState('');

	// need fixing perhaps  //const [img, setImg] = useState('');

	const [imgAlt, setImgAlt] = useState('');

	const getFromDb = async () => {
		try {
			const data = {
				title: title,
				// img: img,
				imgAlt: imgAlt,
			};

			const docRef = await getDoc(collection(db, 'stories'), data);
			console.log('Document added with ID:', docRef.id);

		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};
	
	return (
		<div className='updateStory'>
			
		</div>
	);
}

export default GetTest;
