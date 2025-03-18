const LeaderboardList = () => {
    return (
        <>
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
                    <tbody>{/* table rows be updated here */}</tbody>
                </table>
            </div>
        </>
    );
};

export default LeaderboardList;
