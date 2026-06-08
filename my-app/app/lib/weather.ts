const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
  weatherMain: string;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  cloudCover: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastDay {
  date: Date;
  tempMin: number;
  tempMax: number;
  weatherMain: string;
  description: string;
}

export const weatherIcons: Record<string, string> = {
  Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
  Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Fog: "🌫️",
  Haze: "🌫️", Smoke: "🌫️", Dust: "🌪️", Sand: "🌪️",
  Squall: "💨", Tornado: "🌪️",
};

export const windDirection = (deg: number): string => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("City not found");
  const data = await res.json();

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    description: data.weather[0].description,
    weatherMain: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    windDeg: data.wind.deg || 0,
    pressure: data.main.pressure,
    visibility: data.visibility ? +(data.visibility / 1000).toFixed(1) : 0,
    cloudCover: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&cnt=40&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Forecast not found");
  const data = await res.json();

  const dailyMap: Record<string, ForecastDay> = {};
  data.list.forEach((item: any) => {
    const d = new Date(item.dt * 1000);
    const key = d.toDateString();
    if (!dailyMap[key]) {
      dailyMap[key] = {
        date: d,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weatherMain: item.weather[0].main,
        description: item.weather[0].description,
      };
    } else {
      dailyMap[key].tempMin = Math.min(dailyMap[key].tempMin, item.main.temp_min);
      dailyMap[key].tempMax = Math.max(dailyMap[key].tempMax, item.main.temp_max);
    }
  });

  return Object.values(dailyMap).slice(1, 6);
}