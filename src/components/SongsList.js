import React, { Component } from 'react';
import PropTypes from "prop-types";
import SongCard from './SongCard';

class SongsList extends Component {
    render() {
        const { resultsArray, heart} = this.props;

        return(
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
        );
    }
}

SongsList.propTypes = {
    resultsArray: PropTypes.array,
    heart: PropTypes.string
}

export default SongsList;