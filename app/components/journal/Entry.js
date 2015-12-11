import React, { Component, PropTypes } from "react";

class Entry extends Component {
    render() {
        return (
            <tr
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? "line-through" : "none",
                    cursor: this.props.completed ? "default" : "pointer"
                }}>
                <td>{this.props.text}</td>
            </tr>
        );
    }
}

Entry.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};

export default Entry;
