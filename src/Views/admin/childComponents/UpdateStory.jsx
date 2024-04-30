import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

function UpdateStory() {
	const { id } = useParams(); // Get the story ID from the route parameters
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [audio, setAudio] = useState(null);
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [markerText, setMarkerText] = useState('');
	const [markerLocations, setMarkerLocations] = useState([]);

	useEffect(() => {
		const fetchStory = async () => {
			try {
				const docRef = doc(db, 'stories', id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setTitle(data.title || '');
					setDescription(data.description || '');
					setLongitude(data.longitude || '');
					setLatitude(data.latitude || '');
					setMarkerText(data.markerText || '');
					setAudio(data.audio || '');
					setImage(data.image || '');
					setMarkerLocations(data.markerLocations || []);
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching document:', error);
			}
		};

		fetchStory();
	}, [id]);

	const handleMarkerChange = (index, key, value) => {
		const updatedLocations = [...markerLocations];
		updatedLocations[index][key] = value;
		setMarkerLocations(updatedLocations);
	};

	const submitStory = async (e) => {
		e.preventDefault();
		try {
			const dataToUpdate = {
				title: title,
				description: description,
				image: image,
				audio: audio,
				longitude: longitude,
				latitude: latitude,
				markerText: markerText,
				markerLocations: markerLocations,
			};
			await updateDoc(doc(db, 'stories', id), dataToUpdate);
			console.log('Document updated successfully!');
		} catch (error) {
			console.error('Error updating document:', error);
		}
	};

	const renderMarkerInputs = () => {
		return markerLocations.map((location, index) => (
			<div key={index}>
				<label>Longitude</label>
				<input
					type='text'
					value={location.lng}
					onChange={(e) => handleMarkerChange(index, 'lng', e.target.value)}
				/>
				<label>Latitude</label>
				<input
					type='text'
					value={location.lat}
					onChange={(e) => handleMarkerChange(index, 'lat', e.target.value)}
				/>
			</div>
		));
	};

	return (
		<div>
			<NavLink to='/admin'>
				<button>X</button>
			</NavLink>
			<form onSubmit={submitStory}>
				{/* Form inputs */}
				<div className='form-inner-wrap-left'>
					<div className='input-container'>
						<label>Title</label>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='input-container'>
						<label>Description</label>
						<input
							type='text'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='input-container'>
						<label>Upload Image</label>
						<input
							type='file'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
				</div>
				<div className='form-inner-wrap-middle'>
					<label>Audio Files</label>
					<input
						type='file'
						onChange={(e) => setAudio(e.target.files[0])}
					/>
					<button>Add Additional Audio File</button>
				</div>
				<div className='form-inner-wrap-right'>
					<div className='input-container'>
						<label>Longitude</label>
						<input
							type='text'
							placeholder='Longitude'
							value={longitude}
							onChange={(e) => setLongitude(e.target.value)}
						/>
					</div>
					<div className='input-container'>
						<label>Lattitude</label>
						<input
							type='text'
							placeholder='Lattitude'
							value={latitude}
							onChange={(e) => setLatitude(e.target.value)}
						/>
					</div>
					<div className='input-container'>
						<label>Marker text</label>
						<input
							type='text'
							placeholder='Marker text'
							value={markerText}
							onChange={(e) => setMarkerText(e.target.value)}
						/>
					</div>
					{renderMarkerInputs()}
				</div>
				<button type='submit'>Opdater Historie</button>
			</form>
		</div>
	);
}

export default UpdateStory;
