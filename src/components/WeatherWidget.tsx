"use client";

import { useEffect, useState } from "react";
import { FaWind, FaCompass, FaTemperatureHigh, FaCloud } from "react-icons/fa";

interface WeatherData {
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            const lat = -23.9631;
            const lon = -46.3919;
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&wind_speed_unit=kmh`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setWeather({
                    temperature: data.current.temperature_2m,
                    windSpeed: data.current.wind_speed_10m,
                    windDirection: data.current.wind_direction_10m,
                    weatherCode: data.current.weather_code,
                });
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, []);

    const getWindDirection = (degrees: number) => {
        const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    const getWeatherDescription = (code: number) => {
        const codes: Record<number, string> = {
            0: 'Céu Limpo', 1: 'Limpo', 2: 'Parc. Nublado', 3: 'Nublado',
            45: 'Nevoeiro', 51: 'Garoa', 61: 'Chuva Fraca', 63: 'Chuva',
            80: 'Pancadas', 95: 'Tempestade'
        };
        return codes[code] || 'Desconhecido';
    };

    if (loading) return <div className="text-center p-4">Carregando clima...</div>;
    if (!weather) return <div className="text-center p-4">Clima indisponível</div>;

    return (
        <div className="weather-widget">
            <div className="weather-card">
                <div className="weather-icon"><FaWind /></div>
                <div className="weather-value">{Math.round(weather.windSpeed)} km/h</div>
                <div className="weather-label">Vento</div>
            </div>
            <div className="weather-card">
                <div className="weather-icon"><FaCompass /></div>
                <div className="weather-value">{getWindDirection(weather.windDirection)}</div>
                <div className="weather-label">Direção</div>
            </div>
            <div className="weather-card">
                <div className="weather-icon"><FaTemperatureHigh /></div>
                <div className="weather-value">{Math.round(weather.temperature)}°C</div>
                <div className="weather-label">Temperatura</div>
            </div>
            <div className="weather-card">
                <div className="weather-icon"><FaCloud /></div>
                <div className="weather-value">{getWeatherDescription(weather.weatherCode)}</div>
                <div className="weather-label">Condição</div>
            </div>

            <style jsx>{`
        .weather-widget {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .weather-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: var(--transition);
        }
        .weather-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-gold);
        }
        .weather-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--accent-gold);
          display: flex;
          justify-content: center;
        }
        .weather-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-light);
        }
        .weather-label {
          font-size: 0.8rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
        </div>
    );
}
