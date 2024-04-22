import React from 'react';
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore";
import firebaseSetup from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

//Make into POST instead - addDoc function

function PostTest({title, imgFile, imgFileAlt }) {

	const firebaseConfig = {
		apiKey: "AIzaSyCdoyP8-Yvp_dODgygoa0wCqqIMChZ3yxI",
		authDomain: "geografisk-have-eksamen.firebaseapp.com",
		projectId: "geografisk-have-eksamen",
		storageBucket: "geografisk-have-eksamen.appspot.com",
		messagingSenderId: "655966352285",
		appId: "1:655966352285:web:5af953758470ba6c8c3574"
	};

	const app = initializeApp(firebaseConfig);

	const db = getFirestore(app);
//So we can get it to send data, however it does not take the values in the input fields, which is what we are trying to get it to do.
	function getInputValues(className) {
	const inputElement = document.querySelector(`.${className}`);
	return inputElement ? inputElement.value : null;
	}	

	const handleAddDoc = async () => {
	try {
		const titleValue = getInputValues('title'); // Replace with actual class name
		const imgValue = getInputValues('imgFile'); // Replace with actual class name
		const imgAltValue = getInputValues('imgFileAlt'); // Replace with actual class name

		const data = {
		title: titleValue,
		img: imgValue,
		imgAlt: imgAltValue,
		};

		// Add the data to the Firestore collection
		const docRef = await addDoc(collection(db, 'stories'), data);
		console.log('Document added with ID:', docRef.id);
	} catch (error) {
		console.error('Error adding document:', error);
	}
	};



	return (
		<div className="createStory">
			<input className={title} type="text" placeholder="Title" />
			<input className={imgFile} type="file" accept="image/*" />
			<input className={imgFileAlt} type="text" placeholder="Image Alt Text" />
			<button onClick={handleAddDoc}>Add to Firestore</button>
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