import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRotateRight,
	faRotateLeft,
	faPlay,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
//Components
import AudioPlayPart from '@/Components/AudioPlayPart/AudioPlayPart';

//Css
import Component from '@/assets/styles/components/modules/MainAudioPlayer/main-audio-player.module.scss';

function Audio({ audioFiles, currentIndex }) {
	const [currentAudioIndex, setCurrentAudioIndex] = useState(currentIndex);
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [popup, setPopup] = useState(true);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			// audioRef.current.play(); Autoplay not okay in some browsers so we will not use it
		} else {
			audioRef.current.pause();
		}
	}, [currentAudioIndex]);

	const handleNext = () => {
		setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
		setIsPlaying(true);
	};

	const handlePrevious = () => {
		setCurrentAudioIndex(
			(prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length
		);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	const handlePlayPause = () => {
		const audio = audioRef.current;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch((error) => {
				console.error('Error:', error);
			});
		}
		setIsPlaying(!isPlaying);
	};

	const handleTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime);
	};

	const handleLoadedMetadata = () => {
		setDuration(audioRef.current.duration);
	};

	return (
		<div className={Component.audioWrapper}>
			{popup && (
				<div className='pop-up'>
					<button onClick={() => setPopup(!popup)}>Use Audio</button>
				</div>
			)}
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleNext}
				src={audioFiles[currentAudioIndex]}></audio>
			<p style={{ padding: '1em' }}>
				currently playing: {currentAudioIndex + 1} / {audioFiles.length}
			</p>

			<div className={Component.timeIndicator}>
				<div
					style={{
						position: 'absolute',
						height: '100%',
						borderRadius: '10px',
						background: 'green',
						width: `${(currentTime / duration) * 100}%`,
					}}></div>
			</div>
			<div className={Component.numIndicator}>
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1.5em',
				}}>
				<button
					onClick={handlePrevious}
					style={{
						background: 'none',
						border: 'none',
					}}>
					<FontAwesomeIcon
						icon={faRotateLeft}
						className={Component.audioControlButtons}
					/>
				</button>
				<button
					onClick={handlePlayPause}
					style={{
						background: 'none',
						border: 'none',
						touchAction: 'none',
					}}>
					{isPlaying && isPlaying ? (
						<FontAwesomeIcon
							icon={faPause}
							className={Component.audioControlButtons}
						/>
					) : (
						<FontAwesomeIcon
							icon={faPlay}
							className={Component.audioControlButtons}
						/>
					)}
				</button>
				<button
					onClick={handleNext}
					style={{
						background: 'none',
						border: 'none',
					}}>
					<FontAwesomeIcon
						icon={faRotateRight}
						className={Component.audioControlButtons}
					/>
				</button>
			</div>
			<input
				type='range'
				min='0'
				max={duration}
				value={currentTime}
				onChange={(e) => (audioRef.current.currentTime = e.target.value)}
				style={{
					width: '100%',
					WebkitAppearance: 'none',
					appearance: 'none',
					background: 'transparent',
					opacity: '0',
				}}
			/>

			{audioFiles.map((audio, index) => (
				<div key={index}>
					<AudioPlayPart
						Index={index}
						audio={audio}
					/>
				</div>
			))}
		</div>
	);
}

export default Audio;
