import React, { Component, PropTypes } from "react";

class AddEntry extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateDisabledState();
    }

    getDefaultDate() {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    getDescriptionField() {
        return this.refs.description;
    }

    getDescription() {
        return this.getDescriptionField().value.trim();
    }

    hasDescription() {
        return this.getDescription().length > 0;
    }

    handleSubmit() {
        this.props.onAddClick(this.getDescription());
        this.getDescriptionField().value = "";
        this.updateDisabledState();
    }

    updateDisabledState() {
        this.refs.button.disabled = this.getDescription().length === 0;
    }

    // submit the form when enter key is pressed
    handleKeyUp(e) {
        const key = e.which;
        // timeout needed for propagation of input field text change
        window.setTimeout(() => {
            this.updateDisabledState();
            if (!this.hasDescription()) {
                return;
            }
            if (key === 13) {
                this.handleSubmit();
            }
        }, 0);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <input id="add-entry-input-date" ref="inputDate"
                           className="form-control margin-bottom"
                           type="date" defaultValue={this.getDefaultDate()} />
                </div>
                <div className="col-sm-9">
                    <div className="input-group margin-bottom">
                        <input id="add-entry-description" ref="description" type="text"
                               className="form-control" placeholder="Beschreibung…"
                               onKeyUp={e => this.handleKeyUp(e)} />
                        <span className="input-group-btn">
                            <button
                                ref="button"
                                id="add-entry-button"
                                className="btn btn-default"
                                type="button"
                                onClick={() => this.handleSubmit()}
                            >Hinzufügen</button>
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
