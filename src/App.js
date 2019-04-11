import React, { Component } from 'react';
import { debounce } from 'lodash';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import heart from './images/heart.svg';
import Header from './components/Header';
import './App.css';
import { fetchSongs } from './services/ApiRequest';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultsArray: [],
      query: ''
    }
  }

  getSongs = debounce(() => {
    const { query } = this.state;

    fetchSongs(query)
    .then(data => {
      const results = data.results;
      console.log(results)
      this.setState({resultsArray: results})
    })
  }, 1000);

  getSearchName = (e) => {
    const nameValue = e.currentTarget.value;
    this.setState({query:nameValue})

    this.getSongs();
  }

  render() {
    const { resultsArray } = this.state;
    const { getSearchName } = this;
    
    return (
      <div className="App">
        <Header  
          handTap={handTap}
          getSearchName={getSearchName} 
          magnify={magnify}
          heart={heart} />

        <main className="Main-section">
          <ul className="Songs__list">
              {resultsArray.map((item, index) => {
                return(
                  <li className="Song__item" key={index}>
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
