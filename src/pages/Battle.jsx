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

const Battle = () => {
  return <div className="bg-red-500 text-white p-4">Tailwind Test Div</div>;
};

export default Battle;
