import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import AudioPlayer from '@/Components/AudioPlayer';
import { DraggableMenu } from '../Components/DraggableMenu';

function MapView() {
	const { storyId } = useParams(); // Extract the story ID from the URL
	const [storyDetails, setStoryDetails] = useState(null);
	const [userLocation, setUserLocation] = useState([55.471, 9.4868]);

	useEffect(() => {
		// Fetch the user's current location
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setUserLocation([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				console.error('Error getting user location:', error);
			}
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	useEffect(() => {
		// Fetch the story details from the database using the story ID
		const fetchStoryDetails = async () => {
			try {
				const docRef = doc(db, 'stories', storyId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setStoryDetails(docSnap.data()); // Set the story details
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching story details:', error);
			}
		};

		if (storyId) {
			fetchStoryDetails();
		}
	}, [storyId]);

	return (
		<div style={{ height: '90vh', width: '100vw' }}>
			<MapContainer
				center={storyDetails?.markerLocations || [55.4721, 9.4929]}
				zoom={16}
				style={{ height: '100%', width: '100%' }}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{storyDetails && (
					<Marker position={storyDetails.markerLocations}>
						<Popup>{storyDetails.title}</Popup>
					</Marker>
				)}
				<Marker position={userLocation}>
					<Popup>Your location</Popup>
				</Marker>
			</MapContainer>

			<AudioPlayer />
			<DraggableMenu />
		</div>
	);
}

export default MapView;
