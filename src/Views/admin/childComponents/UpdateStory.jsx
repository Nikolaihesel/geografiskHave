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
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching document:', error);
			}
		};

		fetchStory();
	}, [id]);

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
			};
			await updateDoc(doc(db, 'stories', id), dataToUpdate);
			console.log('Document updated successfully!');
		} catch (error) {
			console.error('Error updating document:', error);
		}
	};

	return (
		<div>
			<NavLink to='/admin'>
				<button>X</button>
			</NavLink>
			<form onSubmit={submitStory}>
				<div className='form-inner-wrap-left'>
					<div className='inout-container'>
						<label>Title</label>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='inout-container'>
						<label>Beskrivelse</label>
						<input
							type='text'
							placeholder='Beskrivelse'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='inout-container'>
						<label>Upload Image</label>
						<input
							type='file'
							placeholder='Upload Image'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
				</div>
				<div className='form-inner-wrap-middle'>
					<label>Lydfiler</label>
					<input
						type='file'
						placeholder='Upload lydfil'
						onChange={(e) => setAudio(e.target.files[0])}
					/>
					<button>Tilføj ekstra lydfil</button>
				</div>
				<div className='form-inner-wrap-right'>
					<div className='inout-container'>
						<label>Longitude</label>
						<input
							type='text'
							placeholder='Longitude'
							value={longitude}
							onChange={(e) => setLongitude(e.target.value)}
						/>
					</div>
					<div className='inout-container'>
						<label>Lattitude</label>
						<input
							type='text'
							placeholder='Lattitude'
							value={latitude}
							onChange={(e) => setLatitude(e.target.value)}
						/>
					</div>
					<div className='inout-container'>
						<label>Marker text</label>
						<input
							type='text'
							placeholder='Marker text'
							value={markerText}
							onChange={(e) => setMarkerText(e.target.value)}
						/>
					</div>
				</div>
				<button type='submit'>Opdater Historie</button>
			</form>
		</div>
	);
}

export default UpdateStory;
