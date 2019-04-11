import React, { Component } from 'react';
import PropTypes from "prop-types";
import SongCard from './SongCard';

class SongsList extends Component {
    render() {
        const { resultsArray} = this.props;

        return(
            <ul className="Songs__list">
                {resultsArray.map((item, index) => {
                    return(
                        <SongCard key={index}
                        image={item.artworkUrl100}
                        trackName={item.trackName}
                        collectionName={item.collectionName} />
                    )
                })}
            </ul>
        );
    }
}

SongsList.propTypes = {
    resultsArray: PropTypes.array,
}

export default SongsList;