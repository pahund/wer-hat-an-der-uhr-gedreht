import React, { Component } from "react";
import { Link } from "react-router";
import styles from "./Home.module.css";
import Header from "./Header";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header section="home" />
                <div className="container">
                    <div className={styles.container}>
                        <h2>Wer hat an der Uhr gedreht?</h2>
                        <Link to="/counter">to Counter</Link>
                    </div>
                </div>
            </div>
        );
    }
}
