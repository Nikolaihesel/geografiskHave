import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Audio from './Audio';
import { DraggableCore } from 'react-draggable';

import Style from '../assets/styles/components/modules/draggable.module.scss';

function DraggableMenu() {
	const [footerPosition, setFooterPosition] = useState({ x: 0, y: 0 });

	const handleDrag = (event, ui) => {
		setFooterPosition({
			x: ui.deltaX,
			y: ui.deltaY,
		});
	};

	return (
		<div>
			
			<Draggable 
				axis='y'
				onDrag={handleDrag}
				bounds={{ top: -550, bottom: 0 }}>
				<div className={Style.draggable}
					/*style={{
						//position: 'absolute',
						//bottom: '-73vh',
						//left: '0',
						//transform: `translate ${footerPosition.y}px)`,
						//zIndex: '1000',
						//width: '100%',
						//height: '80vh',
						//backgroundColor: 'gray',
						//color: 'white',
						//display: 'flex',
						//justifyContent: 'center',
						//alignItems: 'flex-start',
					}}*/>
					<div className={Style.lineDrag}></div>
					<h3>Draggable Menu</h3>
					<div>
						<Audio />
					</div>
				</div>
			</Draggable>
		</div>
	);
}

export { DraggableMenu };
