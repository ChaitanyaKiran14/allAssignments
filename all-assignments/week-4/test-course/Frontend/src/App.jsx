import React, { useState } from 'react';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('Song Title');
  const [artist, setArtist] = useState('Artist Name');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="spotify-player">
      <div className="song-info">
        <h3>{currentSong}</h3>
        <p>{artist}</p>
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default App
