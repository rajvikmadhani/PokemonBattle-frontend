import Filter from "../components/Filter";
import LeaderboardList from "../components/LeaderboardList";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
    return (
        <>
            <div className="min-h-screen bg-[#1F1F1F] text-white py-10">
                <div className="max-w-4xl mx-auto p-6">
                    <div className={`${styles.gameboy} w-full p-6`}>
                        <h1
                            className={`${styles.gameboyHeader} text-2xl mb-6 text-center`}
                        >
                            Game Leaderboard
                        </h1>
                        <Filter />
                        <LeaderboardList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;
