import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/battle'); // Redirects to the battle page
  };

  return (
    <footer className="relative w-full py-6 px-10 flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/src/assets/footer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Side: Footer Icon (Vertically Centered) */}
      <img
        src="/src/assets/footer-icon.webp"
        alt="Footer Icon"
        className="absolute left-6 w-60 h-40 z-10"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Neon Styled Text */}
        <h2
          className="text-5xl md:text-7xl font-bold text-[#0000FF] uppercase"
          style={{
            textShadow: '0px 0px 10px #FF00FF, 0px 0px 20px #FF00FF, 0px 0px 30px #FF00FF',
            fontFamily: 'Press Start 2P, sans-serif',
          }}
        >
          Play Again?
        </h2>

        {/* Restart Button */}
        <button
          onClick={handlePlayAgain}
          className="mt-4 px-8 py-3 text-2xl font-bold text-white bg-[#00FFFF] border-4 border-[#00FFFF] rounded-lg"
          style={{
            boxShadow: '0px 0px 15px #00FFFF, 0px 0px 30px #00FFFF',
            fontFamily: 'Press Start 2P, sans-serif',
          }}
        >
          Restart Battle
        </button>
      </div>

      {/* Right Side: High Score & Win Streak */}
      <div className="absolute bottom-4 right-10 space-x-6 text-white text-2xl z-10">
        <p className="border m-2 px-4 py-1 border-[#00FFFF]">🏆 High Score: 9999</p>
        <p className="border m-2 px-4 py-1 border-[#00FFFF]">🔥 Win Streak: 5</p>
      </div>
    </footer>
  );
};

export default Footer;
