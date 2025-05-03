import { Music2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = 'https://res.cloudinary.com/dao5kgzkm/video/upload/v1741316071/audio/backgroundMusic.mp3';
  
  const audioRef = useRef(null);
  
  // Initialize the audio element
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.crossOrigin = 'anonymous';
    audio.volume = 0.15;
    audioRef.current = audio;
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audioUrl]);
  
  // Function to toggle music play/pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play music automatically for a limited time
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    // Start playing the music automatically
    const playPromise = audio.play();
    
    // Handle play promise (may fail due to autoplay restrictions)
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Autoplay prevented:', error);
      });
    }

    // Set a timeout to stop the music after 20 seconds
    const timer = setTimeout(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    }, 20000);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <button 
      aria-label='Música de fondo'
      className='md:absolute top-28 bg-blue-dark text-white px-4 py-2 rounded hover:bg-blue-darkest flex items-center space-x-2'
      onClick={toggleMusic}
    >
      <Music2 className='w-6 h-6' />
      <span>{isPlaying ? 'Parar música' : 'Disfruta la música'}</span>
    </button>
  );
};

export default Music;