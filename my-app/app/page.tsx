"use client";

import { useState } from "react";
import Searchbar from "@/app/component/Searchbar";
import Weather from "@/app/component/Weather";
import StatsGrid from "@/app/component/StatsGrid";
import ForecastRow from "@/app/component/ForecastRow";
import Loader from "@/app/component/common/Loader";
import {
  CurrentWeather,
  ForecastDay,
  fetchCurrentWeather,
  fetchForecast,
} from "@/app/lib/weather";

export default function Home() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");
    setCurrent(null);
    setForecast([]);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrent(weatherData);
      setForecast(forecastData);
    } catch {
      setError("City not found. Please check the name and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="text-center pt-10 pb-2">
        <h1 className="text-2xl font-semibold tracking-wide">🌤️ Weather App</h1>
      </div>

      <Searchbar onSearch={handleSearch} loading={loading} />

      {error && (
        <p className="text-red-400 text-center text-sm mb-4">{error}</p>
      )}

      {loading && <Loader />}

      {!loading && !current && !error && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-600">
          <p className="text-5xl mb-4">🌍</p>
          <p className="text-lg">Search any country</p>
        </div>
      )}

      {!loading && current && (
        <>
          <Weather data={current} />
          <StatsGrid data={current} />
          {forecast.length > 0 && <ForecastRow data={forecast} />}
        </>
      )}
    </main>
  );

}