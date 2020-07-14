// https://www.mockaroo.com/ <3
import eventsData from "../data/events.json";
import conferenceData from "../data/conference-data.json";
import speakersData from "../data/speakers.json";
import tagsData from "../data/tags.json";
import subjectData from "../data/subjects.json";
import _ from "lodash";

const events = eventsData;
const subjects = subjectData;
const conferenceInfo = conferenceData;
const speakers = speakersData;
const tags = tagsData;
fixDates();
function fixDates() {
  events.forEach((event) => {
    let startDate = new Date(event.startDate);
    startDate = startDate.toISOString().substring(0, 10);
    let endDate = new Date(event.endDate);
    endDate = endDate.toISOString().substring(0, 10);

    let startTime = new Date(event.startDate);
    startTime = startTime.toISOString().substring(11, 16);
    let endTime = new Date(event.endDate);
    endTime = endTime.toISOString().substring(11, 16);

    event.startDate = startDate;
    event.endDate = endDate;
    event.startTime = startTime;
    event.endTime = endTime;
    delete event["date"];
  });
}

export function getEvents() {
  return events;
}

export function getEvent(id) {
  return events.find((m) => m.id === id);
}

export function getTags() {
  return tags;
}

export function getSubjects() {
  return subjects;
}

export function getSpeakers() {
  return speakers;
}

export function getConferenceInfo() {
  return conferenceInfo;
}

export function getDates() {
  let dates = [];
  events.forEach((event) => {
    dates.push(event.startDate);
  });
  return _.sortedUniq(dates);
}
