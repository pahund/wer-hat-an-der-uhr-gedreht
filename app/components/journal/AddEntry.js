import React, { Component, PropTypes } from "react";
import moment from "moment";

class AddEntry extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateDisabledState();
    }

    getDefaultDate() {
        return moment().format("YYYY-MM-DD");
    }

    getDescriptionField() {
        return this.refs.description;
    }

    getDescription() {
        return this.getDescriptionField().value.trim();
    }

    getDateField() {
        return this.refs.date;
    }

    getDate() {
        return this.getDateField().value;
    }

    hasDescription() {
        return this.getDescription().length > 0;
    }

    hasDate() {
        return this.getDate().length > 0;
    }

    resetDescription() {
        this.getDescriptionField().value = "";
    }

    handleSubmit() {
        this.props.onAddClick(this.getDate(), this.getDescription());
        // don't reset the date – next entry uses the same date as previous one
        this.resetDescription();
        this.updateDisabledState();
    }

    updateDisabledState() {
        this.refs.button.disabled = !this.hasDescription() || !this.hasDate();
    }

    // submit the form when enter key is pressed and update disabled state when other keys are pressed
    handleKeyUp(e) {
        const key = e.which;
        // timeout needed for propagation of input field text change
        window.setTimeout(() => {
            this.updateDisabledState();
            if (!this.hasDescription() || !this.hasDate()) {
                return;
            }
            if (key === 13) {
                this.handleSubmit();
            }
        }, 0);
    }

    handleChange() {
        this.updateDisabledState();
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <input id="add-entry-date" ref="date"
                           className="form-control margin-bottom"
                           type="date" defaultValue={this.getDefaultDate()}
                           onKeyUp={e => this.handleKeyUp(e)}
                           onChange={() => this.updateDisabledState()} />
                </div>
                <div className="col-sm-9">
                    <div className="input-group margin-bottom">
                        <input id="add-entry-description" ref="description" type="text"
                               className="form-control" placeholder="Description…"
                               onKeyUp={e => this.handleKeyUp(e)} />
                        <span className="input-group-btn">
                            <button
                                ref="button"
                                id="add-entry-button"
                                className="btn btn-default"
                                type="button"
                                onClick={() => this.handleSubmit()}
                            >Add</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

AddEntry.propTypes = {
    onAddClick: PropTypes.func.isRequired
};

export default AddEntry;
