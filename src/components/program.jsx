import React, { Component } from "react";
import _ from "lodash";
import {
  getEvents,
  getTags,
  getDates,
  getSubjects,
} from "../services/fetchService";
import ProgramTable from "./programTable";
import TagList from "./tags";
import SearchBox from "./common/searchBox";
import Tabs from "./common/tabs";

class Program extends Component {
  state = {
    events: [],
    tags: [],
    tabs: [],
    pageSize: 6,
    selectedTag: "",
    selectedTab: "",
    sortColumn: { path: "startTime", order: "asc" },
    searchText: "",
    dates: [],
  };

  componentDidMount() {
    let allEventsTag = { name: "Alle emner", id: "" };
    let allEventsSubjects = { name: "Alle temaer", id: "" };
    let tags = [allEventsTag, ...getTags()];
    let tabs = [allEventsSubjects, ...getSubjects()];
    const events = getEvents();
    events.forEach((event) => {
      event.liked = localStorage.getItem(event.id) === "true";
    });
    this.setState({
      tabs: tabs,
      dates: getDates(),
      events: events,
      tags: tags,
      selectedTag: allEventsTag,
      selectedTab: allEventsSubjects,
    });
  }

  getEvents = (date, events) => {
    return events.filter((event) => event.startDate === date);
  };

  handleDelete = ({ id }) => {
    let events = [...this.state.events];
    events = events.filter((event) => event.id !== id);
    this.setState({ events });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLike = (event) => {
    const isEventAlreadyLiked = localStorage.getItem(event.id) === "true";
    if (isEventAlreadyLiked) {
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
          event.startDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1
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

    const events = _.orderBy(
      filteredEvents,
      [sortColumn.path],
      [sortColumn.order]
    );

    return { totalCount: filteredEvents.length, data: events };
  };

  render() {
    const {
      tags,
      dates,
      searchText,
      tabs,
      selectedTab,
      selectedTag,
    } = this.state;
    const { data: events, totalCount } = this.getPagedData();
    let eventString =
      totalCount === 0
        ? `Der er ingen events tilknyttet denne konference`
        : `Der er ${totalCount} events tilknyttet denne konference`;
    if (selectedTab && selectedTab.id) {
      eventString += ` i temaet ${selectedTab.name}`;
    }
    if (selectedTag && selectedTag.id) {
      eventString += ` med tagget ${selectedTag.name}`;
    }
    return (
      <>
        <h2 className="d-flex justify-content-center mt-5 mb-3">Program</h2>
        <p>{eventString}</p>
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
            <SearchBox value={searchText} onChange={this.handleSearch} />

            <Tabs
              items={tabs}
              textProperty="name"
              valueProperty="id"
              selectedItem={this.state.selectedTab}
              onItemSelect={this.handleTabSelect}
            ></Tabs>

            {dates.map((date) => (
              <ProgramTable
                selectedTag={this.state.selectedTag.id}
                events={this.getEvents(date, events)}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Program;
