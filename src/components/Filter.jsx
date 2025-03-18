const Filter = () => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search user..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input input-bordered w-full bg-[#2C2C2C] text-white border-none focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            />
        </div>
    );
};

export default Filter;
