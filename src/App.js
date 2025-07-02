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
  const [cart, setCart] = useState({}); // { brandId: { ...brand, count } }

  const onSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredBrands = value.length > 0
      ? allBrands.filter(brand => brand.brandName.toLowerCase().includes(value))
      : allBrands;
    setBrands(filteredBrands);
  };

  const onAddToCartClick = (id) => {
    setCart(prevCart => {
      const brand = allBrands.find(item => item.id === id);
      if (prevCart[id]) {
        return {
          ...prevCart,
          [id]: { ...brand, count: prevCart[id].count + 1 }
        };
      } else {
        return {
          ...prevCart,
          [id]: { ...brand, count: 1 }
        };
      }
    });
  };

  const onRemoveFromCartClick = (id) => {
    setCart(prevCart => {
      if (!prevCart[id]) return prevCart;
      if (prevCart[id].count > 1) {
        return {
          ...prevCart,
          [id]: { ...prevCart[id], count: prevCart[id].count - 1 }
        };
      } else {
        const { [id]: _, ...rest } = prevCart;
        return rest;
      }
    });
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Brand Wishlist</h1>
      <input
        className="wishlist-search"
        onChange={onSearchChange}
        placeholder="Search for a brand"
        value={search}
      />
      <ul className="brand-list">
        {brands.map(brand => (
          <li key={brand.id} className="brand-list-item">{brand.brandName}</li>
        ))}
      </ul>
      <div className="cart-section">
        <p className="cart-title">Add brand to your Cart</p>
        <div className="brand-buttons">
          {allBrands.map(brand => (
            <div key={brand.id} className="brand-action">
              <span>{brand.brandName}</span>
              <button className="add-btn" onClick={() => onAddToCartClick(brand.id)}>Add To Cart</button>
            </div>
          ))}
        </div>
        <b className="cart-header">Your Cart</b>
        {Object.keys(cart).length === 0 && <p className="empty-cart">No items in cart.</p>}
        <div className="cart-items">
          {Object.values(cart).map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.brandName} <span className="cart-count">(x{item.count})</span></span>
              <button className="remove-btn" onClick={() => onRemoveFromCartClick(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;