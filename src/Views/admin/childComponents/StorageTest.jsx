import React, { useState } from 'react';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';

function StorageTest() {
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const storage = getStorage();

	const handleChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (file) {
			const storageRef = ref(storage, file.name);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const uploadProgress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(uploadProgress);
				},
				(error) => {
					console.error('Error uploading file:', error);
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					console.log('File available at:', downloadURL);
					//makes url in document in firestore - where the image is stored in storage
					const docRef = await addDoc(collection(db, 'imageUrl'), {
						downloadURL,
					});
					console.log('Document added with ID:', docRef.id);
				}
			);
		}
	};

	return (
		<div>
			<input
				type='file'
				onChange={handleChange}
			/>
			<button onClick={handleUpload}>Upload</button>
			<div>{progress}% Uploaded</div>
		</div>
	);
}

export default StorageTest;
