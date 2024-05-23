import React from 'react';

//scss
import Component from '@/assets/styles/components/modules/SingleMediaPlayer/single-media-player.module.scss';

function AudioPlayPart({ Index, audio }) {
	return (
		<div className={Component.playerComponent}>
			<span className={Component.playerComponentTitle}>
				Geografisk Haves Historie - Del {Index + 1}
			</span>
			<button className={Component.playerComponentButton}>
				<audio
					controls
					style={{ display: 'none' }}>
					<source
						src={audio}
						type='audio/mpeg'
					/>
				</audio>
			</button>
		</div>
	);
}

export default AudioPlayPart;
