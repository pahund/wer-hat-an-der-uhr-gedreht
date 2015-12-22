import React, { Component, PropTypes } from "react";
import moment from "moment";

class Entry extends Component {
    render() {
        return (
            <tr
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? "line-through" : "none",
                    cursor: this.props.completed ? "default" : "pointer"
                }}>
                <td>{moment(this.props.date).format("ddd D MMM YYYY")}</td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
}

Entry.propTypes = {
    onClick: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};

export default Entry;
