import React, { Component, PropTypes } from "react";

class JournalFilters extends Component {
    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return (
                <li className="active"><a onClick={e => e.preventDefault()}>{name}</a></li>
            );
        }

        return (
            <li>
                <a onClick={e => {
                    e.preventDefault();
                    this.props.onFilterChange(filter);
                }}>
                    {name}
                </a>
            </li>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <span className="navbar-brand">Filter:</span>
                    </div>
                    <ul className="nav navbar-nav">
                        {this.renderFilter("SHOW_ALL", "All")}
                        {this.renderFilter("SHOW_COMPLETED", "Completed")}
                        {this.renderFilter("SHOW_ACTIVE", "Active")}
                    </ul>
                </div>
            </nav>
        );
    }
}

JournalFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        "SHOW_ALL",
        "SHOW_COMPLETED",
        "SHOW_ACTIVE"
    ]).isRequired
};

export default JournalFilters;
