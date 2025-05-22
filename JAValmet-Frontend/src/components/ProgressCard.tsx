const ProgressBar = () => {
    return (
        <div className="flex items-center justify-center w-full px-6 mt-50">
            <div className="w-full max-w-xl h-3 bg-neutral-300 rounded-full overflow-hidden">
                <div className="h-3 bg-red-500 w-1/3"></div>
            </div>
        </div>
    );
};

export default ProgressBar;
