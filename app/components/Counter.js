import React, { Component, PropTypes } from "react";
import styles from "./Counter.module.css";
import Header from "./Header";

class Counter extends Component {
    static propTypes = {
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        counter: PropTypes.number.isRequired
    };

    render() {
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        return (
            <div id="page-counter">
                <Header section="counter" />
                <div id="counter" className={`counter ${styles.counter}`}>
                    {counter}
                </div>
                <div className={styles.btnGroup}>
                    <button className={styles.btn} onClick={increment}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button className={styles.btn} onClick={decrement}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
                    <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
                </div>
            </div>
        );
    }
}

export default Counter;
