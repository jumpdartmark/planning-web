import React from 'react';
import { BrowserRouter, Routes, NavLink, Route } from 'react-router-dom';

import PokerApp from "./poker/PokerApp"
import Splash from "./Splash";

import styles from "./App.module.scss"

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <header className={styles.header}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Poker">Poker</NavLink>
        </header>
        <div className={styles.content}>
          <Routes>
            <Route path="" element={<Splash/>}/>
            <Route path="/Poker/*" element={<PokerApp/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
