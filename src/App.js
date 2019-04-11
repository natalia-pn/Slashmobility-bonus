import React, { Component } from 'react';
import { debounce } from 'lodash';
import handTap from './images/gesture-tap-hold.svg';
import magnify from './images/magnify.svg';
import heart from './images/heart.svg';
import Header from './components/Header';
import './App.css';
import { fetchSongs } from './services/ApiRequest';
import SongsList from './components/SongsList';

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
          <SongsList    
            resultsArray={resultsArray}
            heart={heart} />
        </main>
      </div>
    );
  }
}

export default App;
