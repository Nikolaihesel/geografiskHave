// AddStory.jsx
import React, { useState } from 'react';
import TitleInput from './addStory/TitleInput';
import DescriptionInput from './addStory/DescriptionInput';
import FileInput from './addStory/FileInput';
import AudioInput from './addStory/AudioInput';
import MarkerTextInput from './addStory/MarkerTextInput';
import SubmitButton from './addStory/SubmitButton';
import MapWrapper from './addStory/MapWrapper';
import ProgressDisplay from './addStory/ProgressDisplay';
import MarkerLocationManager from './addStory/MarkerLocationManager';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

function AddStory() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState(null);
	const [markerText, setMarkerText] = useState('');
	const [markerLocations, setMarkerLocations] = useState([]);
	const [progress, setProgress] = useState(0);
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });

	const storage = getStorage();

	const handleSubmit = async (e) => {
		e.preventDefault();
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
					console.log('File uploaded:', downloadURL);

					try {
						const docRef = await addDoc(collection(db, 'stories'), {
							title: title,
							description: description,
							image: downloadURL,
							audio: audio, // Assuming you handle audio upload similarly
							markerText: markerText,
							markerLocations: markerLocations,
						});
						console.log('Document added with ID:', docRef.id);
					} catch (error) {
						console.error('Error adding document:', error);
					}
				}
			);
		}
	};

	const addMarkerLocation = () => {
		setMarkerLocations([{ lat: position.lat, lng: position.lng }]);
	};

	const toggleDraggable = () => {
		setDraggable((d) => !d);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className='form-inner-wrap-left'>
					<TitleInput
						title={title}
						setTitle={setTitle}
					/>
					<DescriptionInput
						description={description}
						setDescription={setDescription}
					/>
					<FileInput setFile={setFile} />
				</div>
				<div className='form-inner-wrap-middle'>
					<AudioInput setAudio={setAudio} />
				</div>
				<div className='form-inner-wrap-right'>
					<MarkerLocationManager
						markerLocations={markerLocations}
						setMarkerLocations={setMarkerLocations}
					/>
					<MarkerTextInput
						markerText={markerText}
						setMarkerText={setMarkerText}
					/>
				</div>
				<SubmitButton />
			</form>
			<MapWrapper
				position={position}
				setPosition={setPosition}
				draggable={draggable}
			/>
			<button onClick={addMarkerLocation}>Add Marker Location</button>
			<ProgressDisplay progress={progress} />
		</div>
	);
}

export default AddStory;
