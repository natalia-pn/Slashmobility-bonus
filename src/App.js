import React, { Component } from 'react';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import heart from './images/heart.svg';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img classname="Hand-tap" src={handTap} alt="hand tapping icon"></img>
          
          <label htmlFor="search-field" className="Search-field__label"></label>
          <input type="search" id="search-field" className="Search-field__input" placeholder="Search"/>
          <img classname="Magnify" src={magnify} alt="magnifying glass icon"></img>

          <img classname="Heart" src={heart} alt="heart icon"></img>
          <span className="Counter">1</span>



          
        </header>
      </div>
    );
  }
}

export default App;
