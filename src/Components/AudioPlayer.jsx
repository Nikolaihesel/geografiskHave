import React from 'react';
import ReactDOM from 'react-dom';

const AudioPlayer = window.ReactH5AudioPlayer

const playlist = [
  { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
]

const PlayerApp = () => {
  const [currentTrack, setTrackIndex] = React.useState(0)
  const handleClickNext = () => {
      console.log('click next')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };
  
  const handleEnd = () => {
    console.log('end')
    setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
  }
  return (
      <div className="container">
        <h1>Hello, audio player!</h1>
        <AudioPlayer
          volume="0.5"
          src={playlist[currentTrack].src}
          showSkipControls
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          onError={()=> {console.log('play error')}}
          
        />
        <p>
          <a href="https://github.com/lhz516/react-h5-audio-player" target="_blank">See Docs on Github</a>
         </p>
      </div>
    );
}

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<PlayerApp />);

export { PlayerApp };
export default AudioPlayer;