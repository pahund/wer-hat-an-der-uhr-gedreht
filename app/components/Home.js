import React, { Component, PropTypes } from "react";
import { addEntry, completeEntry, setFilter, Filters } from "../actions/journal";
import Header from "./Header";
import AddJournalEntry from "./AddJournalEntry";
import Journal from "./Journal";
import JournalFilters from "./JournalFilters";
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const { dispatch, visibleEntries, filter } = this.props;
        return (
            <div>
                <Header section="home"/>

                <div className="container">
                    <AddJournalEntry onAddClick={text => dispatch(addEntry(text))}/>
                    <Journal entries={visibleEntries}
                        onEntryClick={index => dispatch(completeEntry(index))}/>
                    <JournalFilters
                        filter={filter}
                        onFilterChange={nextFilter => dispatch(setFilter(nextFilter))}/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    visibleEntries: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
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
        case Filters.SHOW_ALL:
            return entries;
        case Filters.SHOW_COMPLETED:
            return entries.filter(entry => entry.completed);
        case Filters.SHOW_ACTIVE:
            return entries.filter(entry => !entry.completed);
        default:
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleEntries: selectEntries(state.entries, state.filter),
        filter: state.filter
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Home);

