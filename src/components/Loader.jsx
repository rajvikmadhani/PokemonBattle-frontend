import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import loadingAudio from '/src/assets/loading.mp3'; // Ensure the correct path

const Loader = () => {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({ src: [loadingAudio], volume: 0.7 });
  }, []);

  const handleStart = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
    setHasStarted(true);
    setTimeout(() => navigate('/home'), 4000);
  };

  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* NEON PURPLE TEXT */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-[#FF00FF] text-center"
        style={{
          textShadow: '0px 0px 10px #FF00FF, 0px 0px 20px #FF00FF, 0px 0px 30px #FF00FF',
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        KEEP CALM AND GAME ON
      </motion.h1>

      {!hasStarted && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStart}
          className="absolute bottom-10 px-6 py-3 bg-[#FF00FF] text-white font-bold text-lg rounded-lg shadow-lg"
        >
          Start Game
        </motion.button>
      )}
    </motion.div>
  );
};

export default Loader;
