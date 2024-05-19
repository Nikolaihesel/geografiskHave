import React, { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

//scss
import inputStyle from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';
function MapStory({
	markerLocations,
	setMarkerLocations,
	markerText,
	setMarkerText,
}) {
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });
	const markerRef = useRef(null);

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
		<div className='map-wrapper'>
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
							{markerText}
						</div>
					</Popup>
				</Marker>
			</MapContainer>
			<button onClick={addMarkerLocation}>Add Marker Location</button>
		</div>
	);
}

export default MapStory;
