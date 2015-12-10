import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export default class Header extends Component {
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
                        <Link to="/" className="navbar-brand">Wer hat an der Uhr gedreht?</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={ this.props.section === "home" ? "active" : "" }>
                                <Link to="/">Home</Link>
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
}

