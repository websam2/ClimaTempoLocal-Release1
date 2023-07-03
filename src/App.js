import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cities, setCities] = useState([
    { name: "Registro", lat: -24.49496608966295, long: -47.846437048809655 },
    {
      name: "Pariquera-Açu",
      lat: -24.714153904534243,
      long: -47.88217675644778,
    },
    {
      name: "Sete Barras",
      lat: -24.384338401797415,
      long: -47.92866140694135,
    },
  ]);

  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    const newData = [];

    for (const city of cities) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=de84edb4ca485a51e6cb1ccb98ff259a&units=metric&lang=pt_br`
        );

        newData.push({
          name: city.name,
          temperature: res.data.main.temp,
          weather: res.data.weather[0].description,
          tempMin: res.data.main.temp_min,
          tempMax: res.data.main.temp_max,
          humidity: res.data.main.humidity,
          rainH: res.data.rain ? res.data.rain["3h"] : null,
        });
      } catch (err) {
        console.error(err);
      }
    }

    setWeatherData(newData);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="app">
      {weatherData.map((data, index) => (
        <div key={index} className="app__container">
          <div>
            <div>
              <h1>{data.name}</h1>
            </div>
          </div>
          <div>
            <div>Temp. Atual:</div>
            <div>
              <h2>{data.temperature}ºC</h2>
            </div>
          </div>
          <div>
            <div></div>
            <div>
              <h2>{data.weather}</h2>
            </div>
          </div>
          <div>
            <div>Mínima:</div>
            <div>
              <h2>{data.tempMin}ºC</h2>
            </div>
          </div>
          <div>
            <div>Máxima:</div>
            <div>
              <h2>{data.tempMax}ºC</h2>
            </div>
          </div>
          <div>
            <div>Umidade:</div>
            <div>
              <h2>{data.humidity}%</h2>
            </div>
          </div>
          <div>
            <div>Chuva:</div>
            <div>
              <h2>{data.rainH}%</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
