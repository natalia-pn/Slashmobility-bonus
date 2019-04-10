import React, { Component } from 'react';
import { debounce } from 'lodash';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import heart from './images/heart.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsArray: [],
      searchName: ''
    }
  }

  getSongs = debounce(() => {
    const { searchName } = this.state;
    fetch(`https://itunes.apple.com/search?term=${searchName}`) 
    .then(response=> response.json())
    .then(data => {
      const results = data.results;
      console.log(results)
      this.setState({resultsArray: results})
    })
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({searchName:nameValue})

    this.getSongs();
  }



  render() {
    const { resultsArray } = this.state;
    const { getSearchName } = this;
    
    return (
      <div className="App">
        <header className="App-header">
          <img className="Hand-tap" src={handTap} alt="hand tapping icon"></img>
          
          <label htmlFor="search-field" className="Search-field__label"></label>
          <input type="search" id="search-field" className="Search-field__input" placeholder="Search" onKeyUp={getSearchName}/>
          <img className="Magnify" src={magnify} alt="magnifying glass icon"></img>

          <img className="Heart" src={heart} alt="heart icon"></img>
          <span className="Counter">1</span>
        </header>

        <main className="Main-section">
          <ul className="Songs__list">
              {resultsArray.map(item => {
                return(
                    <li className="Song__item" key={item.trackId}>
                      <img className="Song__sleeve" src={item.artworkUrl100} alt={item.collectionName}></img>

                      <p className="Song__title">{item.trackName}</p>

                      <p className="Song__album">{item.collectionName}</p>

                      <img className="Heart" src={heart} alt="heart icon"></img>
                    </li>
                )
              })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
