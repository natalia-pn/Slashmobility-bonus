import React, { Component } from 'react';
import { debounce } from 'lodash';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import heart from './images/heart.svg';
import Header from './components/Header';
import './App.css';
import { fetchSongs } from './services/ApiRequest';
import SongCard from './components/SongCard';

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
                  <SongCard key={index}
                    image={item.artworkUrl100}
                    trackName={item.trackName}
                    collectionName={item.collectionName}
                    heart={heart}/>
                )
              })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
