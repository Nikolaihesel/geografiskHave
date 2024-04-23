import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

import { DraggableMenu } from '../Components/DraggableMenu';
function MapView() {
	const [userLocation, setUserLocation] = useState([55.471, 9.4868]);

	useEffect(() => {
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

	console.log('userLocation:', userLocation);
	return (
		// use draggable marker in cms
		<div style={{ height: '90vh', width: '100vw' }}>
			<MapContainer
				center={[55.4721, 9.4929]}
				zoom={16}
				style={{ height: '100%', width: '100%' }}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={[55.4721, 9.4929]}>
					<Popup>Geografisk Have</Popup>
				</Marker>

				<Marker position={userLocation}>
					<Popup>Your location</Popup>
				</Marker>
			</MapContainer>
			<DraggableMenu />
		</div>
	);
}

export default MapView;

// https://www.openstreetmap.org/#map=15/55.4710/9.4868
