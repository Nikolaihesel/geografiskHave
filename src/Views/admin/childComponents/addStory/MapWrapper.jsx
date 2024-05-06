import React, { useMemo, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapWrapper({ position, setPosition, draggable, positionProp }) {
	return (
		<div className='map-wrapper'>
			<MapContainer
				center={[position.lat, position.lng]}
				zoom={16}
				style={{ height: '500px', width: '500px' }}>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<Marker
					draggable={draggable}
					position={{ positionProp }}
					eventHandlers={{
						dragend: (e) => setPosition(e.target.getLatLng()),
					}}
				/>
			</MapContainer>
		</div>
	);
}

export default MapWrapper;
