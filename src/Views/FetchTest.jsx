import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';

//Make into POST instead - addDoc function

function PostTest() {

	const [title, setTitle] = useState('');

	// need fixing perhaps  //const [img, setImg] = useState('');

	const [imgAlt, setImgAlt] = useState('');

	const addToDb = async () => {
		try {
			const data = {
			title: title,
			// img: img,
			imgAlt: imgAlt,
			};

			const docRef = await addDoc(collection(db, 'stories'), data);
			console.log('Document added with ID:', docRef.id);
		} catch (error) {
			console.error('Error adding document:', error);
		}
	};

	return (
		<div className="createStory">
			<input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
			{/* <input type="file" accept="image/*" onChange={(e) => setImg(e.target.value)} /> */}
			<input type="text" placeholder="Image Alt Text" onChange={(e) => setImgAlt(e.target.value)} />
			<button onClick={addToDb}>Add to Firestore</button>
		</div>
	);
}

export default PostTest;

/* 
function FetchTest() {
	return <div>FetchTest</div>;
}

export default FetchTest;
*/