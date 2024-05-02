import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import AudioPlayer from './AudioPlayer';
import { DraggableCore } from 'react-draggable';

function DraggableMenu() {
	const [footerPosition, setFooterPosition] = useState({ x: 0, y: 0 });

	const handleDrag = (event, ui) => {
		setFooterPosition({
			x: ui.deltaX,
			y: ui.deltaY,
		});
	};

	return (
		<>
			<Draggable
				axis='y'
				onDrag={handleDrag}
				bounds={{ top: -550, bottom: 0 }}>
				<div
					style={{
						position: 'absolute',
						bottom: '-73vh',
						left: '0',
						transform: `translate ${footerPosition.y}px)`,
						zIndex: '1000',
						width: '100%',
						height: '80vh',
						backgroundColor: 'gray',
						color: 'white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}>
					Draggable Footer
					<div>
						<AudioPlayer />
					</div>
				</div>
			</Draggable>
		</>
	);
}

export { DraggableMenu };
