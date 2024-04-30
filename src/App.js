import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Map from './map/Map';
import Auth from './auth/Auth';
import DriversTab from './vodila/CarsUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/map" element={<Map/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
