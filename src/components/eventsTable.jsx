import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';

class EventsTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (event) => (
        <Link to={`/event/${event.id}`}>{event.title}</Link>
      ),
    },
    {
      key: 'tags',
      label: 'Tags',
      content: (event) => (
        event.tags.map((tag) => (
          <span className="badge badge-secondary" key={tag.id}>{tag.name}</span>
        ))
      ),
    },
    { path: 'description', label: 'Beskrivelse' },
    { path: 'date', label: 'Dato' },
    {
      key: 'like',
      content: (event) => (
        <Like
          liked={event.liked}
          onClick={() => this.props.onLike(event)}
        />
      ),
    },
  ];

  render() {
    const { events, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        items={events}
        sortColumn={sortColumn}
      />
    );
  }
}

export default EventsTable;
