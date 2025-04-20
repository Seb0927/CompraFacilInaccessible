import React, { useState, useRef } from 'react';
import { PlayCircle, StopCircle } from 'lucide-react'; // Import icons from lucide-react

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Default state is "stop"
  const audioUrl = 'https://res.cloudinary.com/dao5kgzkm/video/upload/v1741316071/audio/backgroundMusic.mp3'
  const audioRef = useRef(new Audio(audioUrl)); // Reference to the audio file

  // Set the volume to 0.25 when the component is initialized
  audioRef.current.volume = 0.25;

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the music
      audioRef.current.currentTime = 0; // Reset to the beginning
    } else {
      audioRef.current.play(); // Play the music
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  return (
    <button
      onClick={toggleMusic}
      className="md:absolute top-28 bg-blue-dark text-white px-4 py-2 rounded hover:bg-blue-darkest flex items-center space-x-2"
    >
      {isPlaying ? (
        <>
          <StopCircle className="w-6 h-6" /> {/* Stop icon */}
          <span>Parar música</span>
        </>
      ) : (
        <>
          <PlayCircle className="w-6 h-6" /> {/* Play icon */}
          <span>Reproducir música</span>
        </>
      )}
    </button>
  );
};

export default Music;