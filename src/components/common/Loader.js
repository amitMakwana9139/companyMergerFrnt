const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white/10 flex items-center justify-center z-50">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-white rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-black text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div>
            </div>
        </div>
    );
};

export default Loader;
