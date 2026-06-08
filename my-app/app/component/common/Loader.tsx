"use client";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="w-10 h-10 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-sm animate-pulse">Fetching weather...</p>
    </div>
  );
};

export default Loader;
