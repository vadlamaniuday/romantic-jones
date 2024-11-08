import React, { useState } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      //Get coordinates from city name
      const geocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=e5158ca0ee2644cc9ba2b1ab050309c2`
      );

      if (geocodeResponse.data.results.length === 0) {
        throw new Error("Invalid city name");
      }

      const { lat, lng } = geocodeResponse.data.results[0].geometry;

      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      );

      setWeather(weatherResponse.data.current_weather);
    } catch (error) {
      setError("Error: Wrong city name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Weather Now
      </h1>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full max-w-lg">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm md:text-base"
        />
        <button
          onClick={fetchWeather}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
