/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Input.css";

const Input = ({ handleChange = () => {}, hint }) => {
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/cities.json");
        const json = await res.json();
        setCities(json);
      } catch (error) {
        console.error("Error while fetching cities!", error);
      }
    };
    fetchCities();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    handleChange(value);

    const firstChar = value.charAt(0);
    const firstUpper = firstChar === firstChar.toUpperCase();

    const match = firstUpper && cities.find((c) => c.startsWith(value));

    setSuggestion(value && match ? match : "");
  };

  return (
    <div className="input-container">
      <label htmlFor="city-input">{hint}</label>
      <div className="input-wrapper">
        <div className="input-shadow">{suggestion}</div>
        <input
          type="text"
          className="main-input"
          id="city-input"
          value={city}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Input;
