import React from 'react';
import './App.css';
import { FaPlus } from 'react-icons/fa';
import Card from "./components/cards";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Me-API-Playground</h1>
      </header>
      <main>
        <Card />
      </main>

      <button className="create-card-button">
        <FaPlus />
      </button>
    </div>
  );
}

export default App;