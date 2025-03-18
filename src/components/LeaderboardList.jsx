import styles from "../styles/Leaderboard.module.css";

const LeaderboardList = () => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className={styles.gameboyTable}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Best Deck</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{/* Table rows will go here */}</tbody>
                </table>
            </div>
        </>
    );
};

export default LeaderboardList;
