import React, { Component, PropTypes } from "react";
import { addEntry, completeEntry, setFilter, FilterType } from "../actions/journal";
import Header from "./Header";
import AddEntry from "./journal/AddEntry";
import Journal from "./journal/Journal";
import Filters from "./journal/Filters";
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const { dispatch, visibleEntries, filter } = this.props;
        return (
            <div id="page-home">
                <Header section="home"/>

                <div className="container">
                    <Filters
                        filter={filter}
                        onFilterChange={nextFilter => dispatch(setFilter(nextFilter))}/>
                    <Journal entries={visibleEntries}
                        onEntryClick={index => dispatch(completeEntry(index))}/>
                    <AddEntry onAddClick={(date, description) => dispatch(addEntry(date, description))} />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    visibleEntries: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })),
    filter: PropTypes.oneOf([
        "SHOW_ALL",
        "SHOW_COMPLETED",
        "SHOW_ACTIVE"
    ]).isRequired
};

function selectEntries(entries, filter) {
    switch (filter) {
        case FilterType.SHOW_ALL:
            return entries;
        case FilterType.SHOW_COMPLETED:
            return entries.filter(entry => entry.completed);
        case FilterType.SHOW_ACTIVE:
            return entries.filter(entry => !entry.completed);
        default:
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleEntries: selectEntries(state.journal.entries, state.journal.filter),
        filter: state.journal.filter
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Home);
