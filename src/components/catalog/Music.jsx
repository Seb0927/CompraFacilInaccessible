import { useState, useEffect, useRef } from 'react';
import { Music2 } from 'lucide-react'

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Default state is "stop"
  const audioUrl = 'https://res.cloudinary.com/dao5kgzkm/video/upload/v1741316071/audio/backgroundMusic.mp3'
  const audioRef = useRef(new Audio(audioUrl)); // Reference to the audio file

  // Set the volume to 0.15 when the component is initialized
  audioRef.current.volume = 0.15;

  // Function to toggle music play/pause (Implement later)
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the music
      audioRef.current.currentTime = 0; // Reset to the beginning
    } else {
      audioRef.current.play(); // Play the music
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  // Start music automatically
  useEffect(() => {
    // Set the volume
    audioRef.current.volume = 0.15;

    // Start playing the music automatically
    const playPromise = audioRef.current.play();
    
    // Handle potential autoplay restrictions
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }

    // Set a timeout to stop the music after 20 seconds (For accessibility)
    const timer = setTimeout(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }, 20000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  return (
    <button 
      className="md:absolute top-28 bg-blue-dark text-white px-4 py-2 rounded hover:bg-blue-darkest flex items-center space-x-2"
      aria-label="Música de fondo"
    >
      <Music2 className="w-6 h-6" /> {/* Music icon */}
      <span>Disfruta la música</span>
    </button>
  );
};

export default Music;