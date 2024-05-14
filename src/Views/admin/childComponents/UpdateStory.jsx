import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css modules
import inputStyle from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';

//TODO refactor this component, to some smaller components
//TODO update to handle storage & firestore

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
	const [progress, setProgress] = useState(0);

	//Storage handling
	const handleChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

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
			<div
				className={inputStyle.inputContainer}
				key={index}>
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

	// MAP
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });
	const markerRef = useRef(null);

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
			<NavLink to='/admin'>
				<button>X</button>
			</NavLink>
			<form onSubmit={submitStory}>
				{/* Form inputs */}
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
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
				</div>
				<div className='form-inner-wrap-middle'>
					<div className={inputStyle.inputContainer}>
						<label>Audio Files</label>
						<input
							type='file'
							onChange={(e) => setAudio(e.target.files[0])}
						/>
					</div>
				</div>
				<div className='form-inner-wrap-right'>
					<div className={inputStyle.inputContainer}>
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
		</div>
	);
}

export default UpdateStory;
