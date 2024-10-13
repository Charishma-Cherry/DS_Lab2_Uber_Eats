import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function CountryDropdown({ value, onChange, placeholder = 'Select a country' }) {
  const [error, setError] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const selectedValue = useMemo(() => {
    if (!value) return null;
    return options.find(option => option.value === value) || null;
  }, [value, options]);

  const handleChange = (selectedOption) => {
    setError(null);
    onChange(selectedOption ? selectedOption.value : null);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? 'red' : provided.borderColor,
    }),
  };

  return (
    <div>
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        isClearable={true}
        placeholder={placeholder}
        styles={customStyles}
        onBlur={() => {
          if (!value) setError('Please select a country');
        }}
      />
      {error && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{error}</div>}
    </div>
  );
}

export default CountryDropdown;