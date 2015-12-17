import React, { Component, PropTypes } from "react";

class AddEntry extends Component {

    constructor(props) {
        super(props);
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
        this.updateDisabledState();
    }

    updateDisabledState() {
        this.refs.button.disabled = this.getText().length === 0;
    }

    // submit the input field when enter key is pressed
    handleKeyUp(e) {
        const key = e.which;
        // timeout needed for propagation of input field text change
        window.setTimeout(() => {
            this.updateDisabledState();
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
                <input ref="input" type="text" className="form-control" placeholder="Beschreibung…"
                       onKeyUp={e => this.handleKeyUp(e)} />
                <span className="input-group-btn">
                    <button
                        ref="button"
                        id="add-entry-button"
                        className="btn btn-default"
                        type="button"
                        onClick={() => this.handleSubmit()}
                        disabled
                        >Hinzufügen</button>
                </span>
            </div>
        );
    }
}

AddEntry.propTypes = {
    onAddClick: PropTypes.func.isRequired
};

export default AddEntry;
