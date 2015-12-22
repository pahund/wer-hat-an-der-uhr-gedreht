import React, { Component, PropTypes } from "react";
import JournalEntry from "./Entry";

class Journal extends Component {
    render() {
        return (
            <table id="journal" className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
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
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};

export default Journal;
