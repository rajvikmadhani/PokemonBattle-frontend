import Filter from "../components/Filter";
import LeaderboardList from "../components/LeaderboardList";

const Leaderboard = () => {
    return (
        <div className="min-h-screen bg-[#1F1F1F] text-white py-10">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-5xl font-bold text-center text-pink-500 mb-8">
                    Game Leaderboard
                </h1>
                <Filter />
                <LeaderboardList />
            </div>
        </div>
    );
};

export default Leaderboard;
