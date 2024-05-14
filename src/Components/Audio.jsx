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

	const handlePlayNext = () => {
		setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
		console.log(currentAudioIndex);
	};

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
				ref={audioRef}
				onEnded={handlePlayNext}>
				<source
					src={audioFiles[currentAudioIndex]}
					type='audio/mpeg'
				/>
			</audio>
			<p style={{ padding: '1em' }}>
				currently playing: {currentAudioIndex + 1 + '/' + audioFiles.length}
			</p>
			<div>
				<button
					onTouchStart={handlePrevious}
					onClick={handlePrevious}>
					Previous
				</button>
				<button
					onTouchStart={handleNext}
					onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Audio;
