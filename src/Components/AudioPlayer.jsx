import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

import '@/Components/audioplayer.scss';

const AudioComponent = () => {
	const playlist = [
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
	];
	const [currentTrack, setTrackIndex] = useState(0);

	console.log(playlist);
	return (
		<div className='container'>
			<AudioPlayer
				showSkipControls={true}
				preload='auto'
				showFilledVolume={'true'}
				onClickPrevious={'prev song'}
				onClickNext={'next SOng'}
				src={playlist}
				onPlay={(e) => console.log('onPlay')}
			/>
		</div>
	);
};

export default AudioComponent;
