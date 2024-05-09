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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();

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

		if (!file) {
			console.error('No file selected for upload');
			return;
		}

		// Upload file to Firebase Storage - not Firestore
		const storageRef = ref(storage, file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);

		try {
			await uploadTask;
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			console.log('File uploaded:', downloadURL);

			let audioURLs = [];
			for (const audioFile of audio) {
				const audioRef = ref(storage, audioFile.name);
				const uploadAudioTask = uploadBytesResumable(audioRef, audioFile);
				await uploadAudioTask;
				const audioURL = await getDownloadURL(uploadAudioTask.snapshot.ref);
				audioURLs.push(audioURL);
			}

			// Add the document to Firestore
			const docRef = await addDoc(collection(db, 'stories'), {
				title,
				description,
				image: downloadURL,
				audio: audioURLs,
				markerText,
				markerLocations,
			});
			console.log('Document added with ID:', docRef.id);
			toast.success('Story added successfully!', {
				position: 'top-center',
				autoClose: false, // Disable auto-close
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				closeButton: true, // Show close button
				progress: undefined,
			});

			// Set a timer for the toast
			const toastTimer = setTimeout(() => {
				toast.dismiss(); // This will close the toast
				navigate('/admin'); // Navigate after the toast is closed
			}, 5000); // Set the timer for 5 seconds

			toast.onChange((numberOfToastDisplayed) => {
				if (numberOfToastDisplayed === 0) {
					clearTimeout(toastTimer); // Clear the timer if the toast is manually closed
				}
			});
		} catch (error) {
			console.error('Error during the upload process:', error);
		}
	};

	const handleAudioChange = (e) => {
		const selectedAudio = e.target.files; // This is now a FileList of files
		setAudio((prevAudio) => [...prevAudio, ...selectedAudio]); // This will append new files to the existing audio state
	};

	const removeAudio = (indexToRemove) => {
		setAudio((prevAudio) =>
			prevAudio.filter((_, index) => index !== indexToRemove)
		);
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
							multiple
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
