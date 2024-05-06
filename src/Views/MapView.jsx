import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import AudioPlayer from '@/Components/AudioPlayer';

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

	const markerObject = {
		1: {
			position: [55.4721, 9.4929],
			markerText: 'This is a marker',
		},
		2: {
			position: [55.4721, 9.4929],
			markerText: 'This is a marker',
		},
		3: {
			position: [55.4721, 9.4929],
			markerText: 'This is a marker',
		},
	};

	console.log('userLocation:', userLocation);
	return (
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

				{markerObject &&
					markerObject.map((index, marker) => {
						<Marker
							key={index}
							position={marker.position}>
							<Popup> {marker.markerText} </Popup>{' '}
						</Marker>;
					})}

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
