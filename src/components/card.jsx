import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Howl } from 'howler'; // Import Howler
import cardFrame from '../assets/card-frame.jpeg';

const Card = ({ pokemon, isMusicOn }) => {
  if (!pokemon) return <p className="text-white text-center">Loading...</p>;
  const navigate = useNavigate();

  // Load Pokémon Cry (Controlled by isMusicOn)
  const [cry] = useState(
    new Howl({
      src: [
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`,
      ],
      volume: 0.5,
    })
  );

  // Fetch battle stats from local storage
  const getBattleStats = pokemonId => {
    const stats = JSON.parse(localStorage.getItem('battleStats')) || {};
    return stats[pokemonId] || { wins: 0, losses: 0 };
  };

  const { wins, losses } = getBattleStats(pokemon.id);

  // Extract Pokémon Stats
  const stats = pokemon.stats.reduce((acc, stat) => {
    acc[stat.stat.name] = stat.base_stat;
    return acc;
  }, {});

  // Generate Flavor Text
  const generateFlavorText = name => {
    const descriptions = [
      `${name} strikes with speed.`,
      `${name} roars with power.`,
      `${name} dominates battles.`,
      `${name} moves like a storm.`,
      `${name} is reborn strong.`,
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };
  const flavorText = generateFlavorText(pokemon.name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
      transition={{ duration: 0.5 }}
      className="relative w-72 h-96 flex flex-col items-center text-white bg-cover shadow-lg"
      style={{
        backgroundImage: `url(${cardFrame})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Energy Cost */}
      <div className="absolute left-1/2 transform -translate-x-1/2 px-3 text-lg font-bold">
        {pokemon.base_experience}
      </div>

      {/* Pokémon Name (Centered) */}
      <h3 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl text-[#FF3131] font-extrabold uppercase tracking-wide">
        {pokemon.name}
      </h3>

      {/* Pokémon Image */}
      <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-lg">
        <motion.img
          src={pokemon.sprites?.other?.['official-artwork']?.front_default || '/placeholder.png'}
          alt={pokemon.name || 'Unknown Pokémon'}
          className="w-32 h-32 object-contain transition-transform"
          initial={{ scale: 1, filter: 'drop-shadow(0px 0px 0px transparent)' }}
          whileHover={{ scale: 1.1, filter: 'drop-shadow(0px 0px 15px #FF00FF)' }}
          onMouseEnter={() => isMusicOn && cry.play()} // 🔊 Play cry only if music is ON
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Stats & Flavor Text */}
      <div className="absolute bottom-[100px] grid grid-cols-2 gap-x-4 items-center justify-center text-lg">
        <div className="text-left">
          <p className="text-[#0089b2] font-bold">
            🛡️ DEF: <span className="text-[#BC13FE]">{stats.defense}</span>
          </p>
          <p className="text-[#FFFF00] font-bold">
            💖 HP: <span className="text-[#BC13FE]">{stats.hp}</span>
          </p>
        </div>
        <div className="text-left">
          <p className="text-[#dddddd] font-bold">
            ⚔️ ATK: <span className="text-[#BC13FE]">{stats.attack}</span>
          </p>
          <p className="text-[#FF5C00] font-bold">
            ⚡ SPD: <span className="text-[#BC13FE]">{stats.speed}</span>
          </p>
        </div>
      </div>
      {/* Separator Image with Opacity */}
      <img
        src="./src/assets/separator.png"
        alt="Separator"
        className="absolute bottom-[80px] w-2/3 min-w-xs opacity-50 transition-opacity duration-300"
      />
      {/* Flavor Text Animation */}
      <div className="absolute bottom-[55px] leading-none overflow-hidden flex items-center justify-center max-w-xs">
        <motion.p
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="text-[#d9ff36] italic text-lg text-center whitespace-nowrap drop-shadow-md"
        >
          "{flavorText}"
        </motion.p>
      </div>

      {/* Details Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(`/details/${pokemon.id}`)}
        className="absolute bottom-[15px] w-40 h-14 bg-cover bg-center text-white font-bold text-sm uppercase"
        style={{
          backgroundImage: 'url(/src/assets/button.png)',
          backgroundSize: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        Details
      </motion.button>
    </motion.div>
  );
};

export default Card;
