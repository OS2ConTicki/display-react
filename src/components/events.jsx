import React, { Component } from "react";
import _ from "lodash";
import { getEvents, getTags } from "../services/fakeConferenceService";
import { paginate } from "./utils/paginate";
import EventsTable from "./eventsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Events extends Component {
  state = {
    events: [],
    tags: [],
    pageSize: 4,
    currentPage: 1,
    selectedTag: "",
    sortColumn: { path: "date", order: "asc" },
    searchText: "",
  };

  componentDidMount() {
    let tags = [{ name: "Alle events", id: "" }, ...getTags()];
    this.setState({ events: getEvents(), tags: tags });
  }

  handleDelete = ({ id }) => {
    let events = [...this.state.events];
    events = events.filter((event) => event.id !== id);
    this.setState({ events });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLike = (event) => {
    const eventToEdit = { ...event };
    eventToEdit.liked = !eventToEdit.liked;
    const index = this.state.events.indexOf(event);
    const events = [...this.state.events];
    events[index] = eventToEdit;
    this.setState({ events });
  };

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1, searchText: "" });
  };

  handleSearch = (searchText) => {
    this.setState({
      selectedTag: null,
      currentPage: 1,
      searchText,
    });
  };

  getPagedData = () => {
    const {
      events: allEvents,
      pageSize,
      currentPage,
      selectedTag,
      sortColumn,
      searchText,
    } = this.state;
    let filteredEvents = allEvents;

    if (searchText) {
      filteredEvents = allEvents.filter(
        (event) =>
          event.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    } else if (selectedTag && selectedTag.id) {
      filteredEvents = [];
      allEvents.forEach((event) => {
        event.tags.forEach((tag) => {
          if (tag.id === selectedTag.id) {
            filteredEvents.push(event);
          }
        });
      });
    }

    const sortedEvents = _.orderBy(
      filteredEvents,
      [sortColumn.path],
      [sortColumn.order]
    );

    const events = paginate(sortedEvents, currentPage, pageSize);
    return { totalCount: filteredEvents.length, data: events };
  };

  render() {
    const { pageSize, currentPage, tags, sortColumn, selectedTag } = this.state;
    const { length: count } = this.state.events;

    if (count === 0) {
      return <p>Der er ikke nogle events tilknyttet denne konference</p>;
    }
    const { totalCount, data: events } = this.getPagedData();
    let eventString = `Der er ${totalCount} events tilknyttet denne konference`;
    if (selectedTag && selectedTag.id) {
      eventString += ` med tagget ${selectedTag.name}`;
    }
    const { searchText } = this.state;
    return (
      <>
        <h2 className="d-flex justify-content-center mt-5 mb-3">Events</h2>
        <div className="row" id="events">
          <div className="col-md-2">
            <ListGroup
              items={tags}
              textProperty="name"
              valueProperty="id"
              selectedItem={this.state.selectedTag}
              onItemSelect={this.handleTagSelect}
            />
          </div>
          <div className="col">
            <p>{eventString}</p>

            <SearchBox value={searchText} onChange={this.handleSearch} />
            <EventsTable
              events={events}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Events;
