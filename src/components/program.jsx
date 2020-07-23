import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import ProgramTable from "./programTable";
import TagList from "./tags";
import SearchBox from "./common/searchBox";
import Tabs from "./common/tabs";
import urlContext from "../context/urlContext";

function Program({ eventsList, tagsList, themesList }) {
  let allEventsTag = { name: "Alle emner", id: "" };
  let allEventsThemes = { name: "Alle temaer", id: "" };
  const context = useContext(urlContext);
  const [sortedEvents, setSortedEvents] = useState(eventsList);
  const [selectedTag, setSelectedTag] = useState(allEventsTag);
  const [selectedTab, setSelectedTab] = useState(allEventsThemes);
  const [sortColumn, setSortColumn] = useState({
    path: "startTime",
    order: "asc",
  });

  const [tags] = useState([allEventsTag, ...tagsList]);
  const [tabs] = useState([allEventsThemes, ...themesList]);
  const [searchText, setSearchText] = useState("");

  const [dates, setDates] = useState(getDates());
  function getDates() {
    let returnDatesArray = [];
    sortedEvents.forEach((event) => {
      returnDatesArray.push(event.startDate);
    });
    return _.uniq(returnDatesArray);
  }

  function handleSort(sortColumn) {
    setSortColumn(sortColumn);
  }
  function handleLike(event) {
    const isEventAlreadyLiked = localStorage.getItem(event.id) === "true";
    if (isEventAlreadyLiked) {
      localStorage.setItem(event.id, false);
    } else {
      localStorage.setItem(event.id, true);
    }

    const eventToEdit = { ...event };
    eventToEdit.liked = !eventToEdit.liked;
    let events = [...sortedEvents]; 
    const index = events.indexOf(event);
    events[index] = eventToEdit; 
    setSortedEvents(events); 
  }
  
  
  function handleTagSelect(tag) {
    setSelectedTag(tag);
    setSearchText("");
    // setCurrentPage(1)
  }

  function handleTabSelect(tab) {
    setSelectedTab(tag);
    setSearchText("");
    // setCurrentPage(1)
  }

  function handleSearch(searchText) {
    setSearchText(searchText);
    // setCurrentPage(1)
  }

  function getPagedData() {
    // const {
    //   events: sortedEvents,
    //   selectedTag,
    //   sortColumn,
    //   searchText,
    //   selectedTab,
    // } = this.state;
    // let filteredEvents = allEvents;

    // if (searchText) {
    //   filteredEvents = allEvents.filter(
    //     (event) =>
    //       event.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
    //       event.description.toLowerCase().indexOf(searchText.toLowerCase()) >
    //         -1 ||
    //       event.startDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    //   );
    // } else if (selectedTag && selectedTag.id) {
    //   filteredEvents = [];
    //   allEvents.forEach((event) => {
    //     event.tags.forEach((tag) => {
    //       if (tag.id === selectedTag.id) {
    //         filteredEvents.push(event);
    //       }
    //     });
    //   });
    // }
    // if (selectedTab && selectedTab.id) {
    //   filteredEvents = filteredEvents.filter(
    //     (event) => event.subject.id === selectedTab.id
    //   );
    // }

    // const events = _.orderBy(
    //   filteredEvents,
    //   [sortColumn.path],
    //   [sortColumn.order]
    // );

    // return { totalCount: filteredEvents.length, data: events };
    return { totalCount: sortedEvents?.length, data: sortedEvents };
  }

  const { data: events, totalCount } = getPagedData();
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
          {tags && (
            <TagList
              items={tags}
              textProperty="name"
              valueProperty="id"
              selectedItem={selectedTag}
              onTagSelect={handleTagSelect}
            />
          )}
        </div>
        <div className="col">
          <SearchBox value={searchText} onChange={handleSearch} />
          {tabs && (
            <Tabs
              items={tabs}
              textProperty="name"
              valueProperty="id"
              selectedItem={selectedTab}
              onItemSelect={handleTabSelect}
            ></Tabs>
          )}

          {dates.map((date) => (
            <ProgramTable
              key={date}
              events={sortedEvents.filter((event) => event.startDate === date)}
              onLike={handleLike}
              onSort={handleSort}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Program;
