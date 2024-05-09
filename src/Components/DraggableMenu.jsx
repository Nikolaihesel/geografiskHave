import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Audio from './Audio';
import { DraggableCore } from 'react-draggable';

import Style from '../assets/styles/components/modules/draggable.module.scss';

function DraggableMenu({ audioData, currentIndex }) {
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
				<div className={Style.draggable}>
					<div className={Style.lineDrag}></div>
					<h3>Draggable Menu</h3>
					<div>
						<Audio
							audioFiles={audioData}
							currentIndex={currentIndex}
						/>
					</div>
				</div>
			</Draggable>
		</div>
	);
}

export { DraggableMenu };
