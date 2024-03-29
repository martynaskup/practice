import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountrySelect = styled.select`
  width: 270px;
`;

const Countries = ({ country, handleChange }) => {
  const [allCountries, setAllCountries] = useState([]);

  const countryList = () => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        const countries = data.map(item => {
          const singleCountry = { name: item.name, id: item.alpha2Code };
          return singleCountry;
        });
        setAllCountries(countries);
      });
  };

  useEffect(() => countryList(), []);

  const countryOptions = allCountries.map(item => {
    return (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    );
  });

  const handleCountryChange = e => {
    handleChange(e.target.value);
  };

  return (
    <label>
      Country: &nbsp;
      <CountrySelect
        name='country'
        value={country}
        onChange={handleCountryChange}
      >
        <option value=''>-- Choose the country --</option>
        {countryOptions}
      </CountrySelect>
    </label>
  );
};

export default Countries;
