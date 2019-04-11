import React, { Component} from 'react';
import PropTypes from "prop-types";

class IonSearchbar extends Component {
    render() {
        const { getSearchName, magnify } = this.props;

        return(
            <div className="Search-bar">
                <label htmlFor="search-field" className="Search-field__label"></label>
                <input type="search" id="search-field" className="Search-field__input" placeholder="Search" onChange={getSearchName}/>   

                {/* <img className="Magnify" src={magnify} alt="magnifying glass icon"></img> */}
                <i class="fas fa-search"></i>
            </div>
        );
    }
}

IonSearchbar.propTypes = {
    getSearchName: PropTypes.func,
    magnify:PropTypes.string,
}

export default IonSearchbar;

               