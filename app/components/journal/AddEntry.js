import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { textfieldEmpty, textfieldFilled } from "../../actions/journal";

function stateChecker(getState) {
    let state = getState();
    return () => {
        const newState = getState();
        const changed = newState !== state;
        state = newState;
        return changed;
    };
}

class AddEntry extends Component {

    constructor(props) {
        super(props);
        this.hasTextLengthChanged = stateChecker(() => this.refs.input ? this.hasText() : false);
    }

    getInput() {
        return this.refs.input;
    }

    getText() {
        return this.getInput().value.trim();
    }

    hasText() {
        return this.getText().length > 0;
    }

    handleSubmit() {
        this.props.onAddClick(this.getText());
        this.getInput().value = "";
        this.dispatchTextChange();
    }

    dispatchTextChange() {
        if (this.hasTextLengthChanged()) {
            this.props.dispatch(this.hasText() ? textfieldFilled() : textfieldEmpty());
        }
    }

    // submit the input field when enter key is pressed
    handleKeyUp(e) {
        const key = e.which;
        // timeout needed for propagation of input field text change
        window.setTimeout(() => {
            this.dispatchTextChange();
            if (!this.hasText()) {
                return;
            }
            if (key === 13) {
                this.handleSubmit();
            }
        }, 0);
    }

    render() {
        return (
            <div className="input-group margin-bottom">
                <input type="text" ref="input" className="form-control" placeholder="Beschreibung…"
                       onKeyUp={e => this.handleKeyUp(e)} />
                <span className="input-group-btn">
                    <button
                        id="add-entry-button"
                        className="btn btn-default"
                        type="button"
                        onClick={() => this.handleSubmit()}
                        disabled={this.props.submitDisabled}
                        >Hinzufügen</button>
                </span>
            </div>
        );
    }
}

AddEntry.propTypes = {
    onAddClick: PropTypes.func.isRequired,
    submitDisabled: PropTypes.bool.isRequired
};

function select(state) {
    return {
        submitDisabled: state.journal.submitDisabled
    };
}

export default connect(select)(AddEntry);
