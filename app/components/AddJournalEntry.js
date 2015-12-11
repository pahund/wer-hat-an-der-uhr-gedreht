import React, { Component, PropTypes } from "react";

class AddJournalEntry extends Component {
    handleClick() {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = "";
    }
    render() {
        return (
            <div className="input-group margin-bottom">
                <input type="text" ref="input" className="form-control" placeholder="Beschreibung…" />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={e => this.handleClick(e)}>Hinzufügen</button>
                </span>
            </div>
        );
    }
}

AddJournalEntry.propTypes = {
    onAddClick: PropTypes.func.isRequired
};

export default AddJournalEntry;
