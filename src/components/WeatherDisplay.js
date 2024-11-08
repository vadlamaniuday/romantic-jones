import React from "react";

const WeatherDisplay = ({ weather }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4 md:p-6 w-full max-w-sm text-center">
      <h2 className="text-lg md:text-xl font-semibold mb-2">Current Weather</h2>
      <p className="text-gray-600 text-sm md:text-base">
        Temperature: {weather.temperature}°C
      </p>
      <p className="text-gray-600 text-sm md:text-base">
        Wind Speed: {weather.windspeed} km/h
      </p>
      <p className="text-gray-600 text-sm md:text-base">
        Weather: {weather.weathercode}
      </p>
    </div>
  );
};

export default WeatherDisplay;
