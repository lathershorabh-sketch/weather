"use client";

import { CurrentWeather, windDirection } from "@/app/lib/weather";

interface StatsGridProps {
  data: CurrentWeather;
}

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
}

const StatCard = ({ label, value, unit, icon }: StatCardProps) => (
  <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-1">
    <p className="text-gray-400 text-xs flex items-center gap-1">
      <span>{icon}</span> {label}
    </p>
    <p className="text-white text-xl font-medium">
      {value}
      {unit && <span className="text-gray-400 text-sm ml-1">{unit}</span>}
    </p>
  </div>
);

const formatTime = (unix: number) =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const StatsGrid = ({ data }: StatsGridProps) => {
  const stats: StatCardProps[] = [
    { icon: "💧", label: "Humidity",    value: data.humidity,   unit: "%" },
    { icon: "💨", label: "Wind",        value: data.windSpeed,  unit: `km/h ${windDirection(data.windDeg)}` },
    { icon: "🔵", label: "Pressure",    value: data.pressure,   unit: "hPa" },
    { icon: "👁️", label: "Visibility",  value: data.visibility, unit: "km" },
    { icon: "🌡️", label: "Min / Max",   value: `${data.tempMin}° / ${data.tempMax}°` },
    { icon: "☁️", label: "Cloud Cover", value: data.cloudCover, unit: "%" },
    { icon: "🌅", label: "Sunrise",     value: formatTime(data.sunrise) },
    { icon: "🌇", label: "Sunset",      value: formatTime(data.sunset) },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto px-4 pb-6">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default StatsGrid;