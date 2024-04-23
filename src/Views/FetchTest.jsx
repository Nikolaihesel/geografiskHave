import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

function PostTest() {
	const [title, setTitle] = useState('');
	const [longitude, setLongitude] = useState('');

	const addToDb = async () => {
		try {
			const data = {
				title: title,
				longitude: longitude,
			};
			//ref til db
			const dockRef = await addDoc(collection(db, 'stories'), data);
			console.log('Document added with ID:', dockRef.id);
		} catch (error) {
			console.error('Error adding document:', error);
		}
	};

	return (
		<div className='createStory'>
			<input
				type='text'
				placeholder='Title'
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type='text'
				name='longitude'
				placeholder='Longitude'
				onChange={(e) => setLongitude(e.target.value)}
			/>

			<button onClick={addToDb}>Add to Firestore</button>
		</div>
	);
}

export default PostTest;
