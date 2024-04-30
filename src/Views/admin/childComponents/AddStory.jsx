import { useCallback, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

function AddStory() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [audio, setAudio] = useState(null);
	const [markerText, setMarkerText] = useState('');
	const [markerLocations, setMarkerLocations] = useState([]);

	// Map
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });
	const markerRef = useRef(null);
	const eventHandlers = useMemo(
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

	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);

	const addMarkerLocation = useCallback(() => {
		setMarkerLocations((prevLocations) => [
			...prevLocations,
			{ lat: position.lat, lng: position.lng },
		]);
	}, [position]);

	const renderMarkerInputs = () => {
		return markerLocations.map((location, index) => (
			<div key={index}>
				<label>Longitude</label>
				<input
					type='text'
					value={location.lng}
					onChange={(e) => {
						const updatedLocations = [...markerLocations];
						updatedLocations[index].lng = e.target.value;
						setMarkerLocations(updatedLocations);
					}}
				/>
				<label>Latitude</label>
				<input
					type='text'
					value={location.lat}
					onChange={(e) => {
						const updatedLocations = [...markerLocations];
						updatedLocations[index].lat = e.target.value;
						setMarkerLocations(updatedLocations);
					}}
				/>
			</div>
		));
	};

	const submitStory = async (e) => {
		e.preventDefault();
		try {
			const data = {
				title: title,
				description: description,
				image: image,
				audio: audio,
				markerLocations: markerLocations,
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
			<form onSubmit={submitStory}>
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
					{renderMarkerInputs()}
					<div className='input-container'>
						<label>Marker Text</label>
						<input
							type='text'
							placeholder='Marker text'
							value={markerText}
							onChange={(e) => setMarkerText(e.target.value)}
						/>
					</div>
				</div>
				<button type='submit'>Create Story</button>
			</form>
			<div className='map-wrapper'>
				<MapContainer
					center={[55.4721, 9.4929]}
					zoom={16}
					style={{ height: '500px', width: '500px' }}>
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker
						draggable={draggable}
						eventHandlers={eventHandlers}
						position={position}
						ref={markerRef}>
						<Popup minWidth={90}>
							<span onClick={toggleDraggable}>
								{draggable
									? 'Marker is draggable'
									: 'Click here to make marker draggable'}
							</span>
						</Popup>
					</Marker>
				</MapContainer>
				<button onClick={addMarkerLocation}>Add Marker Location</button>
			</div>
		</div>
	);
}

export default AddStory;
