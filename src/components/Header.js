import React, { Component} from 'react';
import PropTypes from "prop-types";

class Header extends Component {
    render() {
        const { handTap, getSearchName, magnify, heart} = this.props;

        return(
            <header className="App-header">
                <img className="Hand-tap" src={handTap} alt="hand tapping icon"></img>
                
                <label htmlFor="search-field" className="Search-field__label"></label>
                <input type="search" id="search-field" className="Search-field__input" placeholder="Search" onKeyUp={getSearchName}/>
                <img className="Magnify" src={magnify} alt="magnifying glass icon"></img>

                <img className="Heart" src={heart} alt="heart icon"></img>
                <span className="Counter">1</span>
            </header>
        );
    }
}

Header.propTypes = {
    handTap: PropTypes.string,
    getSearchName: PropTypes.func,
    magnify:PropTypes.string,
    heart: PropTypes.string
}

export default Header;