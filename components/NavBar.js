"use client";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import moment from "moment-timezone";
import Search from "./Search";

import "./WeatherCard.css";

export default function NavBar() {
  const [sideBar, setSideBar] = useState(false);
  const [city, setCity] = useState("Huaraz");
  const [data, setData] = useState();
  const [forecast, setForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Estado para rastrear unidades
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar carga

  const KEY = "ea8d1197afcdcf7db5d10fa7a763caaf";

  useEffect(() => {
    async function getData(city) {
      setLoading(true); // Inicia la carga

      const CURRENTAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
      const currentResponse = await fetch(CURRENTAPI);
      const currentJson = await currentResponse.json();
      setData(currentJson);

      const FORECASTAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=metric`;
      const forecastResponse = await fetch(FORECASTAPI);
      const forecastJson = await forecastResponse.json();
      setForecast(forecastJson.list.slice(0, 5));

      setLoading(false); // Finaliza la carga
    }

    getData(city);
  }, [city]);

  async function handleUpdateLocation() {
    try {
      setLoading(true); // Inicia la carga

      // Se obtiene la geolocalización del usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const LOCATIONAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
          const locationResponse = await fetch(LOCATIONAPI);
          const locationJson = await locationResponse.json();
          setData(locationJson);

          const FORECASTAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
          const forecastResponse = await fetch(FORECASTAPI);
          const forecastJson = await forecastResponse.json();
          setForecast(forecastJson.list.slice(0, 5));

          setLoading(false);
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoading(false);
    }
  }

  function handleSideBar() {
    setSideBar(!sideBar);
  }

  function handleSearch(newCity) {
    setCity(newCity);
  }

  function handleToggleUnits() {
    setIsCelsius(!isCelsius);
  }

  const windDirections = [
    { min: 0, max: 22.5, direction: "N" },
    { min: 22.5, max: 67.5, direction: "NE" },
    { min: 67.5, max: 112.5, direction: "E" },
    { min: 112.5, max: 157.5, direction: "SE" },
    { min: 157.5, max: 202.5, direction: "S" },
    { min: 202.5, max: 247.5, direction: "SW" },
    { min: 247.5, max: 292.5, direction: "W" },
    { min: 292.5, max: 337.5, direction: "NW" },
    { min: 337.5, max: 360, direction: "N" },
  ];
  {
    /* Crea la variable para almacenar la dirección textual */
  }
  let windTextDirection = "";

  return (
    <main id="container">
      <section id="currentWeather">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div id="navBar-btns">
              <span id="btnSearch" onClick={handleSideBar}>
                <Search />
              </span>
              <button className="btnLocation" onClick={handleUpdateLocation}>
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>
            <div id="navBar-img1">
              <section id="navBar-img2">
                {(() => {
                  let imagePath = "";
                  if (data.weather[0].main === "Clouds") {
                    imagePath = "./Shower2.png";
                  } else if (data.weather[0].main === "Clear") {
                    imagePath = "./Clear.png";
                  } else if (data.weather[0].main === "Sunny") {
                    imagePath = "./shower2.png";
                  } else if (data.weather[0].main === "Stormy") {
                    imagePath = "./rayo2.png";
                  } else if (data.weather[0].main === "Shower") {
                    imagePath = "./Shower2.png";
                  } else if (data.weather[0].main === "Haze") {
                    imagePath = "./HeavyCloud.png";
                  } else if (data.weather[0].main === "Mist") {
                    imagePath = "./HeavyCloud.png";
                  } else if (data.weather[0].main === "Rain") {
                    imagePath = "./rain2.png";
                  } else if (data.weather[0].main === "Windy") {
                    imagePath = "./rai2.png";
                  } else {
                    imagePath = "./cloud2.png";
                  }
                  return (
                    <img
                      className="sun"
                      src={imagePath}
                      alt={data.weather[0].main}
                    />
                  );
                })()}
              </section>
              <div id="navBar-img">
                <img className="clouds" src="./Cloudbgbg.png" alt="cloud" />
              </div>
            </div>
            <div id="grados1">
              <div id="grados">
                <span>
                  {isCelsius
                    ? data.main.temp.toFixed(0)
                    : ((data.main.temp * 9) / 5 + 32).toFixed(0)}
                </span>
              </div>
              <div id="gradosc">
                <span>{isCelsius ? "ºC" : "ºF"}</span>
              </div>
            </div>
            <div id="navBar-data">
              <span>{data.weather[0].main}</span>
              <span className="today">
                <span>Today</span>
                <span>.</span>

                <span>{moment.unix(data.dt).format("ddd, D MMM")}</span>
              </span>
              <span id="cityname">
                <div>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <span>{data.name}</span>
              </span>

              <div>
                <div>
                  <div id="windmain1">
                    <div id="windmain">
                      <h5 id="status">Wind status</h5>
                      <div>
                        <span id="seven">{Math.floor(data.wind.speed)}</span>
                        <span> mph</span>
                      </div>

                      <div id="aguja">
                        <div
                          id="agujax"
                          style={{ transform: `rotate(${data.wind.deg}deg)` }}
                        >
                          <span className="material-symbols-outlined">
                            near_me
                          </span>
                        </div>
                        <div>
                          {(() => {
                            if (
                              data.wind.deg >= 337.5 ||
                              data.wind.deg < 22.5
                            ) {
                              windTextDirection = "N";
                            } else if (
                              data.wind.deg >= 22.5 &&
                              data.wind.deg < 67.5
                            ) {
                              windTextDirection = "NE";
                            } else if (
                              data.wind.deg >= 67.5 &&
                              data.wind.deg < 112.5
                            ) {
                              windTextDirection = "E";
                            } else if (
                              data.wind.deg >= 112.5 &&
                              data.wind.deg < 157.5
                            ) {
                              windTextDirection = "SE";
                            } else if (
                              data.wind.deg >= 157.5 &&
                              data.wind.deg < 202.5
                            ) {
                              windTextDirection = "S";
                            } else if (
                              data.wind.deg >= 202.5 &&
                              data.wind.deg < 247.5
                            ) {
                              windTextDirection = "SW";
                            } else if (
                              data.wind.deg >= 247.5 &&
                              data.wind.deg < 292.5
                            ) {
                              windTextDirection = "W";
                            } else if (
                              data.wind.deg >= 292.5 &&
                              data.wind.deg < 337.5
                            ) {
                              windTextDirection = "NW";
                            }
                          })()}
                          <span id="agujal">{windTextDirection}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="humiditymain">
                  <div id="humidity1">
                    <h5 id="status">Humidity</h5>
                    <div>
                      <span id="seven">{data.main.humidity}</span>
                      <span> %</span>
                    </div>

                    <div id="aguja">
                      <div id="barra-container1">
                        <div id="barra">
                          <div className="barra-label" id="barra-label-0">
                            0
                          </div>
                          <div className="barra-label" id="barra-label-50">
                            50
                          </div>
                          <div className="barra-label" id="barra-label-100">
                            100 %
                          </div>
                          <div
                            id="barra-fill"
                            style={{ "--humidity": data.main.humidity }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="visibilitymain">
                  <div id="visibility1">
                    <h5 id="status">Visibility</h5>
                    <div>
                      <span id="seven">{data.visibility}</span>
                      <span> miles</span>
                    </div>
                  </div>
                </div>

                <div id="pressuremain">
                  <div id="pressuremain1">
                    <h5 id="status">Air Pressure</h5>
                    <div>
                      <span id="seven">{data.main.pressure}</span>
                      <span> mb</span>
                    </div>
                  </div>
                </div>

                <footer id="footer">
                  <h6>created by Carlos RV - devChallengest.io</h6>
                </footer>
              </div>
            </div>
            ;
          </>
        )}
        {sideBar && (
          <SideBar
            fun={handleSideBar}
            handleSearch={handleSearch}
            selectedCity={city}
          />
        )}
      </section>
      <section id="forecast">
        <div id="maingrados">
          <div>
            <h3 id="gradosC" onClick={handleToggleUnits}>
              {!isCelsius ? "ºC" : "ºC"}
            </h3>
          </div>
          <div>
            <h3 id="gradosF" onClick={handleToggleUnits}>
              {isCelsius ? "ºF" : "ºF"}
            </h3>
          </div>
        </div>

        <div id="maincard">
          {forecast.slice(0, 5).map((item, index) => {
            const firstForecastDate = moment.unix(forecast[0].dt); // Obtener la fecha del primer día del pronóstico
            const nextDate = firstForecastDate.clone().add(index+1, "days"); // Calcular la fecha para el día actual del pronóstico

            return (
              <div key={item.dt} id="card">
                <div id="containerC">
                  <h3 id="tomorrow">
                    {index === 0 ? `Tomorrow` : nextDate.format("ddd, D MMM")}
                  </h3>
                  <div id="clear2img"></div>

                  <div id="tminmax">
                    <span>
                      {isCelsius
                        ? Math.round(item.main.temp_min)
                        : Math.round((item.main.temp_min * 9) / 5 + 32)}
                      <span>{isCelsius ? "ºC" : "ºF"}</span>
                    </span>
                    <span>
                      {isCelsius
                        ? Math.round(item.main.temp_max)
                        : Math.round((item.main.temp_max * 9) / 5 + 32)}
                      <span>{isCelsius ? "ºC" : "ºF"}</span>
                    </span>
                  </div>

                  <section id="sectionac">
                    {/* Utiliza las condiciones climáticas para definir la imagen */}
                    {(() => {
                      let imagePath = "";
                      if (item.weather[0].description === "overcast clouds") {
                        imagePath = "./clouds2.png";
                      } else if (
                        item.weather[0].description === "overcast clouds"
                      ) {
                        imagePath = "./clouds2.png";
                      } else if (
                        item.weather[0].description === "broken clouds"
                      ) {
                        imagePath = "./rain2.png";
                      } else if (
                        item.weather[0].description === "scattered clouds"
                      ) {
                        imagePath = "./clouds2.png";
                      } else if (item.weather[0].description === "clear sky") {
                        imagePath = "./Clear.png";
                      } else if (item.weather[0].description === "light rain") {
                        imagePath = "./LightRain2.png";
                      } else if (item.weather[0].description === "few clouds") {
                        imagePath = "./LightCloud2.png";
                      } else if (
                        item.weather[0].description === "moderate rain"
                      ) {
                        imagePath = "./rain2.png";
                      } else {
                        imagePath = "./cloud2.png";
                      }
                      return (
                        <img
                          id="imagenes5"
                          src={imagePath}
                          alt={item.weather[0].description}
                        />
                      );
                    })()}
                  </section>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 id="letters">Today's Hightlights</h3>
        </div>
      </section>
    </main>
  );
}
