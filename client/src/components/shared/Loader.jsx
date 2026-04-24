const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
};


const Loader = ({ size = "md", fullPage = false }) => {
    const spinner = (
        <div
            className={`rounded-full border-gray-200 border-t-black animate-spin ${sizes[size]}`}
        />
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Loader;
