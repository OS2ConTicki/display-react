import React, { useState } from "react";
import _ from "lodash";
import ProgramTable from "./programTable";
import TagList from "./tags";
import SearchBox from "./common/searchBox";
import Tabs from "./common/tabs";

function Program({ eventsList, tagsList, themesList }) {
  let allEventsTag = { title: "Alle emner", id: "" };
  let allEventsThemes = { title: "Alle temaer", id: "" };
  const [events, setEvents] = useState(eventsList);
  const [selectedTag, setSelectedTag] = useState(allEventsTag);
  const [selectedTab, setSelectedTab] = useState(allEventsThemes);

  const [tags] = useState([allEventsTag, ...tagsList]);
  const [tabs] = useState([allEventsThemes, ...themesList]);
  const [searchText, setSearchText] = useState("");

  const [dates] = useState(getDates());
  function getDates() {
    let returnDatesArray = [];
    events.forEach((event) => {
      returnDatesArray.push(event.startDate);
    });
    return _.uniq(returnDatesArray);
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
    let events = [...events];
    const index = events.indexOf(event);
    events[index] = eventToEdit;
    setEvents(events);
  }

  function handleTagSelect(tag) {
    setSelectedTag(tag);
    setSearchText("");
    // setCurrentPage(1)
  }

  function handleTabSelect(tab) {
    setSelectedTab(tab);
    setSearchText("");
    // setCurrentPage(1)
  }

  function handleSearch(searchText) {
    setSearchText(searchText);
    // setCurrentPage(1)
  }

  function getPagedData() {
    let filteredEvents = [...events];
    if (searchText) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.description?.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.startDate?.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1 ||
          event.from?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.to?.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          event.location?.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    }
    if (selectedTag && selectedTag.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.tags.includes(selectedTag.id);
      });
    }
    if (selectedTab && selectedTab.id) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.theme === selectedTab.id;
      });
    }

    return { totalCount: filteredEvents?.length, filteredEvents };
  }

  const { filteredEvents, totalCount } = getPagedData();
  let eventString =
    totalCount === 0
      ? `Der er ingen events tilknyttet denne konference`
      : `Der er ${totalCount} events tilknyttet denne konference`;
  if (selectedTab && selectedTab.id) {
    eventString += ` i temaet ${selectedTab.title}`;
  }
  if (selectedTag && selectedTag.id) {
    eventString += ` med emnet ${selectedTag.title}`;
  }
  return (
    <>
      <h2
        className="d-flex justify-content-center mt-5 mb-3 scroll-offset-class"
        id="program"
      >
        Program
      </h2>
      <p>{eventString}</p>
      <div className="row">
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
              textProperty="title"
              valueProperty="id"
              selectedItem={selectedTab}
              onItemSelect={handleTabSelect}
            ></Tabs>
          )}

          {dates.map((date) => (
            <ProgramTable
              key={date}
              events={filteredEvents.filter(
                (event) => event.startDate === date
              )}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Program;
