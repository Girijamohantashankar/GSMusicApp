import React, { useState, useEffect } from 'react';
import './App.css';
import Musicplayer from './Musicplayer.js';
import Loader from './Loader.js'; // Import your Loader component
import audioClip from './loader.mp3'; // Import your audio clip

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = new Audio(audioClip);
    let audioPlayed = false;

    // Function to handle audio play
    const playAudio = () => {
      if (audio && audio.paused) {
        audio.play();
        audioPlayed = true;
      }
    };

    // Function to handle user interaction event
    const handleInteraction = () => {
      if (!audioPlayed) {
        playAudio();
        setIsLoading(false);
      }
    };

    // Add event listeners for user interaction events
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      audio.pause(); // Pause the audio if component unmounts
    };
  }, []);

  useEffect(() => {
    const hideLoaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Hide loader after 3 seconds

    return () => {
      clearTimeout(hideLoaderTimeout);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        // Show the loader component while isLoading is true
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        // Show the music player app when isLoading becomes false
        <Musicplayer />
      )}
    </>
  );
}

export default App;