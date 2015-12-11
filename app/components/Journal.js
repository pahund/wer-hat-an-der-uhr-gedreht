import React, { Component, PropTypes } from "react";
import JournalEntry from "./JournalEntry";

class Journal extends Component {
    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.entries.map((entry, index) =>
                        <JournalEntry {...entry} key={index} onClick={() => this.props.onEntryClick(index)} />
                    )}
                </tbody>
            </table>
        );
    }
}

Journal.propTypes = {
    onEntryClick: PropTypes.func.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}

export default Journal;
