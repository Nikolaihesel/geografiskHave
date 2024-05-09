import React, { useEffect, useRef, useState } from 'react';

import Style from '../assets/styles/components/modules/draggable.module.scss';

function Audio({ audioFiles, currentIndex }) {
	const [currentAudioIndex, setCurrentAudioIndex] = useState(currentIndex);
	const audioRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			audioRef.current.play();
		}
	}, [currentAudioIndex]);

	const handleNext = () => {
		setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
		console.log(currentAudioIndex);
	};

	const handlePrevious = () => {
		setCurrentAudioIndex(
			(prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length
		);
		console.log(currentAudioIndex);
	};

	return (
		<div className={Style.draggableWrapper}>
			<audio
				controls
				ref={audioRef}>
				<source
					src={audioFiles[currentAudioIndex]}
					type='audio/mpeg'
				/>
			</audio>
			<div>
				<button onClick={handlePrevious}>Previous</button>
				<button onClick={handleNext}>Next</button>
			</div>
		</div>
	);
}

export default Audio;
