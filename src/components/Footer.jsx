import { FaFacebook, FaTwitter, FaInstagram, FaGamepad } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black p-6 text-center z-10 border-t border-gray-800">
      {/* Fun Tagline */}
      <div className="flex justify-center items-center space-x-2 text-green-300 text-lg font-semibold">
        <FaGamepad className="text-yellow-400" />
        <span>Play Hard. Level Up. Repeat! 🎮</span>
      </div>

      {/* Copyright & Motivational Message */}
      <p className="text-green-300 text-sm mt-3">
        "Every battle is a lesson, every victory is a step forward. Keep playing!" 🚀
      </p>
    </footer>
  );
};

export default Footer;
