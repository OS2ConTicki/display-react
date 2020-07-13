import React, { Component } from "react";
import _ from "lodash";
import { getEvents, getTags, getSubjects } from "../services/fetchService";
import { paginate } from "./utils/paginate";
import EventsTable from "./eventsTable";
import Tabs from "./common/tabs";
import TagList from "./tags";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Events extends Component {
  state = {
    events: [],
    tags: [],
    tabs: [],
    pageSize: 6,
    currentPage: 1,
    selectedTag: "",
    sortColumn: { path: "date", order: "asc" },
    searchText: "",
    selectedTab: "",
  };

  componentDidMount() {
    let allEventsTag = { name: "Alle emner", id: "" };
    let allEventsSubjects = { name: "Alle spor", id: "" };
    let tags = [allEventsTag, ...getTags()];
    let tabs = [allEventsSubjects, ...getSubjects()];
    const events = getEvents();
    events.forEach((event) => {
      event.liked = localStorage.getItem(event.id) === "true";
    });
    this.setState({
      events: events,
      tags: tags,
      tabs: tabs,
      selectedTag: allEventsTag,
      selectedTab: allEventsSubjects,
    });
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
    const isEventAlreadyLiked = localStorage.getItem(event.id) === "true";
    if (isEventAlreadyLiked){
      localStorage.setItem(event.id, false);      
    } else {

      localStorage.setItem(event.id, true);
    }
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

  handleTabSelect = (tab) => {
    this.setState({ selectedTab: tab, currentPage: 1, searchText: "" });
  };

  handleSearch = (searchText) => {
    this.setState({
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
      selectedTab,
    } = this.state;
    let filteredEvents = allEvents;

    if (searchText) {
      filteredEvents = allEvents.filter(
        (event) =>
          event.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.description.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.date.toLowerCase().indexOf(searchText.toLowerCase()) > -1
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
    if (selectedTab && selectedTab.id) {
      filteredEvents = filteredEvents.filter(
        (event) => event.subject.id === selectedTab.id
      );
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
    const {
      pageSize,
      currentPage,
      tags,
      tabs,
      sortColumn,
      selectedTag,
      selectedTab,
    } = this.state;
    const { length: count } = this.state.events;

    if (count === 0) {
      return <p>Der er ikke nogle events tilknyttet denne konference</p>;
    }
    const { totalCount, data: events } = this.getPagedData();
    let eventString = `Der er ${totalCount} events tilknyttet denne konference`;
    if (selectedTab && selectedTab.id) {
      eventString += ` i sporet ${selectedTab.name}`;
    }
    if (selectedTag && selectedTag.id) {
      eventString += ` med tagget ${selectedTag.name}`;
    }
    const { searchText } = this.state;
    return (
      <>
        <h2 className="d-flex justify-content-center mt-5 mb-3">Events</h2>
        <div className="row" id="events">
          <div className="col-md-2">
            <TagList
              items={tags}
              textProperty="name"
              valueProperty="id"
              selectedItem={this.state.selectedTag}
              onTagSelect={this.handleTagSelect}
            />
          </div>
          <div className="col">
            <p>{eventString}</p>
            <SearchBox value={searchText} onChange={this.handleSearch} />

            <Tabs
              items={tabs}
              textProperty="name"
              valueProperty="id"
              selectedItem={this.state.selectedTab}
              onItemSelect={this.handleTabSelect}
            ></Tabs>

            <EventsTable
              selectedTag={this.state.selectedTag.id}
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
