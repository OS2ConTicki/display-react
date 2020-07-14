import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import Tag from "./common/tag";

class EventsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (event) => <Link to={`/event/${event.id}`}>{event.title}</Link>,
    },
    {
      key: "tags",
      label: "Tags",
      content: (event) =>
        event.tags.map((tag) => (
          <Tag tag={tag} selectedTag={this.props.selectedTag}></Tag>
        )),
    },
    { path: "description", label: "Beskrivelse" },
    { path: "startDate", label: "Dato" },
    {
      key: "like",
      content: (event) => (
        <Like liked={event.liked} onClick={() => this.props.onLike(event)} />
      ),
    },
  ];

  render() {
    const { events, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortable={true}
        items={events}
        sortColumn={sortColumn}
      />
    );
  }
}

export default EventsTable;
