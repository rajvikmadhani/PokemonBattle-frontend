// Battle logic for Pokémon Battle

//	1. move selection:
//	- Player and CPU each choose their action:
//	- Attack → Uses the Attack value against the opponent's Defense.
//	- Special Attack → Uses the Special Attack value against the opponent's Special Defense.

// 	2. determine the order:
// 	- The Pokémon with the higher Speed stat attacks first.
// 	- If both Pokémon are equally fast, the order is determined at random.

// 	3. damage calculation:
// 	- Formula: Damage = (Attack - Defense) * Type Effectiveness
// 	- If the damage is ≤ 0, at least 1 damage is dealt.
// 	- Type effectiveness:
// 	- Super effective: x2
// 	- Less effective: x0.5
// 	- No effect: x0
// 	- Critical hit: 10% chance for double damage.

// 	4. execute attack:
// 	- The first attacker performs their attack.
// 	- After the attack:
// 	- If the opposing Pokémon is defeated (HP ≤ 0), the round ends.
// 	- If not, the second attacker attacks.
// 	5th round end:
// 	- If both Pokémon are still alive after the round, a new round begins.

import { useState, useEffect } from "react";
import { usePokemon } from "../context/pokemonContext";
import { getRandomPokemon } from "../utils/pokemonAPI";

const Battle = () => {
  const { roster } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [cpuRoster, setCpuRoster] = useState([]);
  const [cpuPokemon, setCpuPokemon] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [cpuHP, setCpuHP] = useState(100);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [round, setRound] = useState(1);

  // CPU bekommt zufällige Pokémon (3 aus 151)
  useEffect(() => {
    const fetchCpuRoster = async () => {
      let roster = [];
      for (let i = 0; i < 3; i++) {
        const randomPokemon = await getRandomPokemon();
        roster.push(randomPokemon);
      }
      setCpuRoster(roster);
    };
    fetchCpuRoster();
  }, []);

  // Startet den Kampf, wählt zufälliges CPU Pokémon
  const startBattle = () => {
    if (!selectedPokemon) return;
    const randomCpuPokemon =
      cpuRoster[Math.floor(Math.random() * cpuRoster.length)];
    setCpuPokemon(randomCpuPokemon);
    setPlayerHP(100);
    setCpuHP(100);
    setBattleLog([`Battle started! Round ${round}`]);
    setIsBattleActive(true);
  };

  // Berechnung des Schadens
  const calculateDamage = (attacker, defender, isSpecial) => {
    const attackStat = isSpecial
      ? attacker.stats.find((s) => s.stat.name === "special-attack").base_stat
      : attacker.stats.find((s) => s.stat.name === "attack").base_stat;

    const defenseStat = isSpecial
      ? defender.stats.find((s) => s.stat.name === "special-defense").base_stat
      : defender.stats.find((s) => s.stat.name === "defense").base_stat;

    let damage = attackStat - defenseStat;
    damage = damage < 5 ? 5 : damage; // Minimaler Schaden

    return damage;
  };

  // Spieler greift an
  const handlePlayerAttack = (isSpecial) => {
    if (!isBattleActive) return;
    let log = [...battleLog];

    const damage = calculateDamage(selectedPokemon, cpuPokemon, isSpecial);
    setCpuHP((prev) => Math.max(prev - damage, 0));
    log.push(
      `${selectedPokemon.name} used ${isSpecial ? "Special Attack" : "Attack"}!`
    );
    log.push(`CPU Pokémon took ${damage} damage!`);

    if (cpuHP - damage <= 0) {
      log.push("CPU Pokémon fainted! You won!");
      setBattleLog(log);
      setIsBattleActive(false);
      return;
    }

    setTimeout(() => {
      handleCpuAttack(log);
    }, 1000);
  };

  // CPU greift an
  const handleCpuAttack = (log) => {
    const isSpecial = Math.random() > 0.5;
    const damage = calculateDamage(cpuPokemon, selectedPokemon, isSpecial);
    setPlayerHP((prev) => Math.max(prev - damage, 0));
    log.push(`CPU Pokémon used ${isSpecial ? "Special Attack" : "Attack"}!`);
    log.push(`${selectedPokemon.name} took ${damage} damage!`);

    if (playerHP - damage <= 0) {
      log.push("Your Pokémon fainted! You lost...");
      setIsBattleActive(false);
    }

    setRound((prev) => prev + 1);
    setBattleLog(log);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Pokémon Battle</h1>

      {/* Pokémon Auswahl */}
      {!isBattleActive && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Choose Your Pokémon</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {roster.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
                className={`p-2 border rounded-lg transition-all ${
                  selectedPokemon?.id === pokemon.id
                    ? "border-blue-500 bg-gray-700"
                    : "border-gray-500 hover:border-gray-400"
                }`}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
                <p className="capitalize">{pokemon.name}</p>
              </button>
            ))}
          </div>
          {selectedPokemon && (
            <button
              onClick={startBattle}
              className="mt-4 px-6 py-2 bg-green-500 rounded-lg"
            >
              Start Battle
            </button>
          )}
        </div>
      )}

      {/* Kampf-Bereich */}
      {isBattleActive && (
        <>
          <p className="text-xl font-bold">Round {round}</p>

          {/* Kampf-Feld */}
          <div className="relative w-full max-w-lg bg-green-500 p-6 rounded-lg border border-black">
            {/* CPU Pokémon */}
            {cpuPokemon && (
              <div className="absolute top-4 right-4 flex flex-col items-center">
                <img
                  src={cpuPokemon.sprites.front_default}
                  alt={cpuPokemon.name}
                  className="w-32 h-32"
                />
                <p className="text-lg font-bold capitalize">
                  {cpuPokemon.name}
                </p>
                <p>HP: {cpuHP}</p>
              </div>
            )}

            {/* Spieler Pokémon */}
            {selectedPokemon && (
              <div className="absolute bottom-4 left-4 flex flex-col items-center">
                <img
                  src={selectedPokemon.sprites.back_default}
                  alt={selectedPokemon.name}
                  className="w-32 h-32"
                />
                <p className="text-lg font-bold capitalize">
                  {selectedPokemon.name}
                </p>
                <p>HP: {playerHP}</p>
              </div>
            )}
          </div>

          {/* Angriffs-Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="px-6 py-2 bg-blue-500 rounded-lg"
              onClick={() => handlePlayerAttack(false)}
            >
              Attack
            </button>
            <button
              className="px-6 py-2 bg-red-500 rounded-lg"
              onClick={() => handlePlayerAttack(true)}
            >
              Special Attack
            </button>
          </div>
        </>
      )}

      {/* Kampf-Log */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold">Battle Log</h2>
        <ul className="list-disc ml-4">
          {battleLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Battle;
