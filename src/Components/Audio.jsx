import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRotateRight,
	faRotateLeft,
	faPlay,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

function Audio({ audioFiles, currentIndex }) {
	const [currentAudioIndex, setCurrentAudioIndex] = useState(currentIndex);
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			audioRef.current.play();
		}
		setIsPlaying(true);
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
			audio.play();
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
		<div
			style={{
				width: '100%',
				maxWidth: '400px',
				margin: 'auto',
				textAlign: 'center',
			}}>
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleNext}
				src={audioFiles[currentAudioIndex]}></audio>
			<p style={{ padding: '1em' }}>
				currently playing: {currentAudioIndex + 1} / {audioFiles.length}
			</p>

			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '5px',
					background: 'lightgray',
					margin: '10px 0',
				}}>
				<div
					style={{
						position: 'absolute',
						height: '100%',
						background: 'green',
						width: `${(currentTime / duration) * 100}%`,
					}}></div>
			</div>
			<div>
				<button
					onTouchStart={handlePrevious}
					onClick={handlePrevious}
					style={{
						background: 'none',
						border: 'none',
						fontSize: '1.5em',
						cursor: 'pointer',
						margin: '0 10px',
					}}>
					<FontAwesomeIcon
						icon={faRotateLeft}
						style={{ color: 'orange' }}
					/>
				</button>
				<button
					onTouchStart={handlePlayPause}
					onClick={handlePlayPause}
					style={{
						background: 'none',
						border: 'none',
						fontSize: '1.5em',
						cursor: 'pointer',
						margin: '0 10px',
					}}>
					{isPlaying && isPlaying ? (
						<FontAwesomeIcon
							icon={faPause}
							style={{ color: 'orange' }}
						/>
					) : (
						<FontAwesomeIcon
							icon={faPlay}
							style={{ color: 'orange' }}
						/>
					)}
				</button>
				<button
					onTouchStart={handleNext}
					onClick={handleNext}
					style={{
						background: 'none',
						border: 'none',
						fontSize: '1.5em',
						cursor: 'pointer',
						margin: '0 10px',
					}}>
					<FontAwesomeIcon
						icon={faRotateRight}
						style={{ color: 'orange' }}
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
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					padding: '10px 0',
				}}>
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>

			{audioFiles.map((audio, index) => (
				<div
					key={index}
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '10px',
						border: '1px solid #D9D9D9',
						borderRadius: '8px',
						backgroundColor: '#FFFFFF',
						margin: '10px 0',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
						overflow: 'auto',
					}}>
					<span
						style={{
							flexGrow: 1,
							fontSize: '16px',
							fontWeight: '500',
							color: '#000000',
						}}>
						Geografisk Haves Historie - Del {index + 1}
					</span>
					<button
						style={{
							width: '40px',
							height: '40px',
							backgroundColor: '#EDA466',
							border: 'none',
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
							margin: '0 10px',
						}}>
						<audio
							controls
							style={{ display: 'none' }}>
							<source
								src={audio}
								type='audio/mpeg'
							/>
						</audio>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='#FFFFFF'
							width='24px'
							height='24px'>
							<path d='M8 5v14l11-7z' />
						</svg>
					</button>
				</div>
			))}
		</div>
	);
}

export default Audio;
