import React, { Component} from 'react';
import PropTypes from "prop-types";
import IonSearchbar from './IonSearchbar';

class Header extends Component {
    render() {
        const { handTap, getSearchName, magnify, heart} = this.props;

        return(
            <header className="App-header">
                <img className="Hand-tap" src={handTap} alt="hand tapping icon"></img>
                
                <IonSearchbar 
                    getSearchName={getSearchName}
                    magnify={magnify} />
                
                <img className="Heart" src={heart} alt="heart icon"></img>
                
                <span className="Counter">1</span>
            </header>
        );
    }
}

Header.propTypes = {
    handTap: PropTypes.string,
    heart: PropTypes.string
}

export default Header;