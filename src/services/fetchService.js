// https://www.mockaroo.com/ <3
import eventsData from "../data/events.json";
import conferenceData from "../data/conference-data.json";
import speakersData from "../data/speakers.json";
import tagsData from "../data/tags.json";
import subjectData from "../data/subjects.json";

const events = eventsData;
const subjects = subjectData;
const conferenceInfo = conferenceData;
const speakers = speakersData;
const tags = tagsData;

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
