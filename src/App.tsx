import React from 'react';
import { BrowserRouter, Routes, NavLink, Route } from 'react-router-dom';

import AuthProvider from "./context/auth/AuthProvider"
import PokerApp from "./poker/PokerApp"
import Splash from "./Splash";
import AuthToggle from "./auth/AuthToggle"

import styles from "./App.module.scss"

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AuthProvider>
          <div className={styles.headerContainer}>
            <header className={`container ${styles.header}`}>
                <div className={styles.links}>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/Poker">Poker</NavLink>
                </div>
                <AuthToggle/>
            </header>
          </div>
          <div className={styles.contentContainer}>
            <div className={`container ${styles.content}`}>
              <Routes>
                <Route path="" element={<Splash/>}/>
                <Route path="/Poker/*" element={<PokerApp/>}/>
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
