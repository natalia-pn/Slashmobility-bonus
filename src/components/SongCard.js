import React, { Component } from 'react';
import PropTypes from "prop-types";

class SongCard extends Component {
    render() {
        const { image, trackName, collectionName} = this.props;

        return(
            <li className="Song__item">
                <img className="Song__sleeve" src={image} alt={collectionName}></img>

                <p className="Song__title">{trackName}</p>

                <p className="Song__album">{collectionName}</p>

                <i class="fas fa-heart"></i>
            </li>
        );
    }
}

SongCard.propTypes = {
    image: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
}

export default SongCard;