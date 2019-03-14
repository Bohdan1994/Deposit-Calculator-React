import React, { Component } from 'react';
import './App.css';
import Calculator from './Components/Calculator.js';
import DepositReport from './Components/DepositReport.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
            <Calculator />
          </div>
        </div>
    );
  }
}

export default App;
