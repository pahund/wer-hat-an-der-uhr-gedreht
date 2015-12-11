import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={ this.props.section === "home" ? "active" : "" }>
                                <Link to="/">Liste</Link>
                            </li>
                            <li className={ this.props.section === "counter" ? "active" : "" }>
                                <Link to="/counter">Counter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    section: PropTypes.string.isRequired
};

export default Header;
