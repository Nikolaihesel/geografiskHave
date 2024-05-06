import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// CSS modules
import inputStyle from '../../../assets/styles/components/modules/Inputs/_inputs.module.scss';

//TODO refactor this component, to some smaller components

function AddStory() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState([]);
	const [markerText, setMarkerText] = useState('');
	const storage = getStorage();
	const [markerLocations, setMarkerLocations] = useState([]);

	// Map
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });
	const markerRef = useRef(null);

	const [progress, setProgress] = useState(0);
	const handleChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			// Upload file to firebase Storage - not firestore
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
					// Upload completed successfully
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					console.log('File uploaded:', downloadURL);

					if (audio.length > 0) {
						let audioURLs = [];
						for (let i = 0; i < audio.length; i++) {
							const audioFile = audio[i];
							// Upload audio to firebase Storage - not firestore
							const audioRef = ref(storage, audioFile.name);
							const uploadAudioTask = uploadBytesResumable(audioRef, audioFile);
					
							uploadAudioTask.on(
								'state_changed',
								(snapshot) => {
									const uploadProgress =
										(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
									setProgress(uploadProgress);
								},
								(error) => {
									console.error('Error uploading audio:', error);
								},
								async () => {
									// Upload completed successfully
									const audioURL = await getDownloadURL(uploadAudioTask.snapshot.ref);
									console.log('Audio uploaded:', audioURL);
									audioURLs.push(audioURL); // Add the audio URL to the array
					
									// If this is the last audio file, add the document to Firestore
									if (i === audio.length - 1) {
										try {
											const docRef = await addDoc(collection(db, 'stories'), {
												title: title,
												description: description,
												image: downloadURL,
												audio: audioURLs, // Use the array of audio URLs here
												markerText: markerText,
												markerLocations: markerLocations,
											});
											console.log('Document added with ID:', docRef.id);
										} catch (error) {
											console.error('Error adding document:', error);
										}
									}
								}
							);
						}
					}
		}
	)}};

	const handleAudioChange = (e) => {
		const selectedAudio = e.target.files; // This is now a FileList of files
		setAudio(prevAudio => [...prevAudio, ...selectedAudio]); // This will append new files to the existing audio state
	};

	const removeAudio = (indexToRemove) => {
		setAudio(prevAudio => prevAudio.filter((_, index) => index !== indexToRemove));
	};

	const handleMarkerTextChange = (e) => {
		setMarkerText(e.target.value);
	};

	const renderMarkerInputs = () => {
		return markerLocations.map((location, index) => (
			<div
				className={inputStyle.inputContainer}
				key={index}>
				<label>Longitude</label>
				<input
					type='text'
					value={location.lng}
					onChange={(e) => handleMarkerLocationChange(e, index, 'lng')}
				/>
				<label>Latitude</label>
				<input
					type='text'
					value={location.lat}
					onChange={(e) => handleMarkerLocationChange(e, index, 'lat')}
				/>
			</div>
		));
	};

	const addMarkerLocation = () => {
		setMarkerLocations([
			...markerLocations,
			{ lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) },
		]);
	};

	const handleMarkerLocationChange = (e, index, key) => {
		const updatedLocations = [...markerLocations];
		updatedLocations[index][key] = e.target.value;
		setMarkerLocations(updatedLocations);
	};

	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);
	const eventHandler = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[]
	);


	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className='form-inner-wrap-left'>
					<div className={inputStyle.inputContainer}>
						<label>Title</label>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className={inputStyle.inputContainer}>
						<label>Description</label>
						<input
							type='text'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className={inputStyle.inputContainer}>
						<label>Upload Image</label>
						<input
							type='file'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='form-inner-wrap-middle'>
					<div className={inputStyle.inputContainer}>
						<label>Audio Files</label>
						<input
							type='file'
							onChange={handleAudioChange}
							multiple // This allows multiple file selection
						/>
						<ul>
							{audio.map((audioFile, index) => (
								<li key={index}>
									{audioFile.name}
									<button onClick={() => removeAudio(index)}>Remove</button>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='form-inner-wrap-right'>
					{renderMarkerInputs()}
					<div className={inputStyle.inputContainer}>
						<label>Marker Text</label>
						<input
							type='text'
							placeholder='Marker text'
							value={markerText}
							onChange={handleMarkerTextChange}
						/>
					</div>
				</div>
				<button type='handleSubmit'>Create Story</button>
			</form>
			<div className='map-wrapper'>
				<MapContainer
					center={[55.4721, 9.4929]}
					zoom={16}
					style={{ height: '500px', width: '500px' }}>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
					<Marker
						draggable={draggable}
						position={position}
						eventHandlers={eventHandler}
						ref={markerRef}>
						<Popup minWidth={90}>
							<div>
								<span onClick={toggleDraggable}>
									{draggable
										? 'Marker is draggable'
										: 'Click here to make marker draggable'}
								</span>
								<br />
							</div>
						</Popup>
					</Marker>
				</MapContainer>
				<button onClick={addMarkerLocation}>Add Marker Location</button>
			</div>
			<div>{progress}% Uploaded</div>
		</div>
	);
}

export default AddStory;
