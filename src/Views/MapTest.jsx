import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
	useParams,
} from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

function MapTest() {
	const [draggable, setDraggable] = useState(false);

	//TRACK LOCATION IN THIS STATE
	const [position, setPosition] = useState([55.4721, 9.4929]);
	const markerRef = useRef(null);
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
	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);

	console.log('position:', position);

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
		</div>
	);
}

export default MapTest;
