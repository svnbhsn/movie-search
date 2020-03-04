import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouterOutlet from './RouterOutlet'
import Layouts from './components/Layout';
import Footer from './components/Footer';

import './App.css';

export default function App() {
  return (
    <div className="App" >
      <header className="App-header">
        <Router>
          <Layouts>
            <RouterOutlet />
          </Layouts>
        </Router>
      </header>
      <Footer />
    </div>
  )
}