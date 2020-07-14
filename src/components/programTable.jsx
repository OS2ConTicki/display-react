import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class ProgramTable extends Component {
  columns = [
    {
      content: (event) => (
        <span>
          {event.startTime} : {event.endTime}
        </span>
      ),
    },
    {
      label: " ",
      key: "like",
      content: (event) => (
        <Like liked={event.liked} onClick={() => this.props.onLike(event)} />
      ),
    },

    {
      label: " ",
      path: "title",
      content: (event) => <Link to={`/event/${event.id}`}>{event.title}</Link>,
    },
    { path: "description", label: " " },
  ];

  render() {
    const { events } = this.props;
    return (
      <>
        {events.length > 0 && (
          <Table
            columns={this.columns}
            items={events}
            label={events[0].startDate}
            sortable={false}
          />
        )}
      </>
    );
  }
}

export default ProgramTable;
