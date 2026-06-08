"use client";

import { ForecastDay, weatherIcons } from "@/app/lib/weather";

interface ForecastRowProps {
  data: ForecastDay[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ForecastRow = ({ data }: ForecastRowProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-8">
      <p className="text-gray-400 text-xs text-center mb-3 uppercase tracking-widest">
        5-Day Forecast
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        {data.map((day, i) => {
          const icon = weatherIcons[day.weatherMain] ?? "🌡️";
          return (
            <div
              key={i}
              className="bg-gray-800 rounded-xl px-4 py-3 flex flex-col items-center gap-1 min-w-[72px]"
            >
              <p className="text-gray-400 text-xs">{DAYS[day.date.getDay()]}</p>
              <p className="text-2xl">{icon}</p>
              <p className="text-white text-sm font-medium">
                {Math.round(day.tempMax)}°
              </p>
              <p className="text-gray-500 text-xs">
                {Math.round(day.tempMin)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastRow;
