import React, { Component} from 'react';
import PropTypes from "prop-types";
import IonSearchbar from './IonSearchbar';

class Header extends Component {
    render() {
        const { handTap, getSearchName, magnify} = this.props;

        return(
            <header className="App-header">
                <img className="Hand-tap" src={handTap} alt="hand tapping icon"></img>
                
                <IonSearchbar 
                    getSearchName={getSearchName}
                    magnify={magnify} />
                
                <i class="fas fa-heart"></i>
                
                <span className="Counter">1</span>
            </header>
        );
    }
}

Header.propTypes = {
    handTap: PropTypes.string,
}

export default Header;