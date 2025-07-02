import React, { useState } from 'react';
import './App.css';

const allBrands = [
  { id: "1", brandName: "Puma" },
  { id: "2", brandName: "Adidas" },
  { id: "3", brandName: "Nike" },
  { id: "4", brandName: "Fila" },
  { id: "5", brandName: "Reebok" },
];

function App() {
  const [search, setSearch] = useState('');
  const [brands, setBrands] = useState(allBrands);

  const onSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredBrands = value.length > 0
      ? allBrands.filter(brand => brand.brandName.toLowerCase().includes(value))
      : allBrands;
    setBrands(filteredBrands);
  };

  return (
    <>
      <input onChange={onSearchChange} placeholder="Search for a brand" />
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>{brand.brandName}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
