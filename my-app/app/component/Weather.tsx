"use client";

import { CurrentWeather, weatherIcons } from "@/app/lib/weather";

interface WeatherProps {
  data: CurrentWeather;
}

const Weather = ({ data }: WeatherProps) => {
  const icon = weatherIcons[data.weatherMain] ?? "🌡️";

  return (
    <div className="flex flex-col items-center justify-center p-10 text-white">
      <h1 className="text-4xl font-bold mb-1">{data.city}</h1>
      <p className="text-gray-400 text-sm mb-4">{data.country}</p>
      <div className="text-7xl mb-3">{icon}</div>
      <p className="text-7xl font-light">{data.temp}°C</p>
      <p className="text-gray-300 mt-2 capitalize text-lg">
        {data.description}
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Feels like {data.feelsLike}°C
      </p>
    </div>
  );
};

export default Weather;
