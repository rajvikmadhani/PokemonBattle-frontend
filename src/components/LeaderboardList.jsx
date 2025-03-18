const leaderboardData = [
    {
        username: "Alice",
        totalScore: 1500,
        avatar: "https://i.pravatar.cc/150?img=1",
        pokemons: [
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        ],
    },
    {
        username: "Bob",
        totalScore: 1200,
        avatar: "https://i.pravatar.cc/150?img=2",
        pokemons: [
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
        ],
    },
    {
        username: "Charlie",
        totalScore: 1100,
        avatar: "https://i.pravatar.cc/150?img=3",
        pokemons: [
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
        ],
    },
];

function LeaderboardList({ currentPlayer = "Charlie" }) {
    const sortedData = [...leaderboardData].sort(
        (a, b) => b.totalScore - a.totalScore
    );

    return (
        <div className="min-h-screen bg-[#1F1F1F] text-white py-10">
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fadeIn {
                    animation: fadeIn 0.5s ease-in-out forwards;
                }
            `}</style>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-5xl font-bold text-center text-pink-500 mb-8">
                    Game Leaderboard
                </h1>

                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="table w-full text-lg bg-[#2C2C2C]">
                        <thead>
                            <tr className="text-gray-400 uppercase">
                                <th className="py-3 text-left pl-4">Rank</th>
                                <th className="py-3 text-left">Player</th>
                                <th className="py-3 text-left">Best Deck</th>
                                <th className="py-3 text-left">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((user, index) => {
                                const rank = index + 1;
                                const isCurrentPlayer =
                                    user.username === currentPlayer;

                                return (
                                    <tr
                                        key={user.username}
                                        className={`border-b border-gray-700 last:border-0 fadeIn transition-all duration-300 transform ${
                                            isCurrentPlayer
                                                ? "bg-pink-600 bg-opacity-30 scale-105"
                                                : "hover:bg-[#3A3A3A] hover:scale-105"
                                        }`}
                                    >
                                        <td className="py-4 pl-4 font-bold">
                                            <span className="text-pink-400">
                                                {rank}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="font-semibold">
                                                {user.username}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex space-x-2">
                                                {user.pokemons.map(
                                                    (pokemonUrl, i) => (
                                                        <img
                                                            key={i}
                                                            src={pokemonUrl}
                                                            alt="Pokemon"
                                                            className="w-16 h-16 transition-transform duration-300 transform hover:scale-110"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-xl">
                                                    {user.totalScore}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardList;
