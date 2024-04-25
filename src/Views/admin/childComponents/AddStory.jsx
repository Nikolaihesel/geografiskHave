import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

function AddStory() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [audio, setAudio] = useState(null);
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [markerText, setMarkerText] = useState('');

	const submitStory = async (e) => {
		e.preventDefault();
		try {
			const data = {
				title: title,
				description: description,
				image: image,
				audio: audio,
				longitude: longitude,
				latitude: latitude,
				markerText: markerText,
			};
			console.log(data);
			const docRef = await addDoc(collection(db, 'stories'), data);
			console.log('Document added with ID:', docRef.id);
		} catch (error) {
			console.error('Error adding document:', error);
		}
	};

	return (
		<div>
			<form
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
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
				<button onClick={submitStory}> Lav Historie </button>
			</form>
		</div>
	);
}

export default AddStory;
