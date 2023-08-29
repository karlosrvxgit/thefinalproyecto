import React, { useState } from "react";
import "/src/App.css";

export default function SideBar(props) {
  const initialCities = [
    "London",
    "Barcelona",
    "Long Beach",
    // Las tres ciudades iniciales visibles
  ];

  const [selectedCity, setSelectedCity] = useState(initialCities[0]);
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCitiesDropdown(false);
    setSearchQuery(city);
  };

  const handleSearchClick = () => {
    props.handleSearch(selectedCity);
    props.fun();
    setSelectedCity("");
  };

  const toggleCitiesDropdown = () => {
    setShowCitiesDropdown(!showCitiesDropdown);
  };

  const handleSearchInputChange = (event) => {
    if (!showCitiesDropdown) {
      setSearchQuery(event.target.value);
      setSelectedCity(event.target.value);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery) {
      setSelectedCity(searchQuery);
      setSearchQuery("");
      setShowCitiesDropdown(false);
    }
  };

  return (
    <nav id="navBar">
      <button id="btnClose" onClick={props.fun}>
        X
      </button>
      <div>
        <main>
          <div id="flex1">
            <section>
              <div id="mainsearch2">
                <div id="mainsearch3">
                  <span className="material-symbols-outlined">search</span>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      placeholder="Search for places"
                      id="input2"
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </form>
                </div>
                <button id="search2" onClick={handleSearchClick}>
                  Search
                </button>
              </div>
              <ul id="city-list">
                {initialCities.map((city, i) => (
                  <li key={i} onClick={() => handleCitySelect(city)}>
                    {city}
                    {i === 0 && (
                      <span
                        className="city-dropdown-toggle"
                        onClick={toggleCitiesDropdown}
                      >
                        &#9660;
                      </span>
                    )}
                  </li>
                ))}
                {showCitiesDropdown &&
                  allCities.map((city, i) => (
                    <li key={i} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </nav>
  );
}
