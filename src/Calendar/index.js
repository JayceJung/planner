import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { ToDoList } from './todo';
import './calendar.css';

export default class Test extends Component {
  state = {
    value: new Date(),
  };

  onChange = value => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div>
        <Calendar onChange={this.onChange} value={value} calendarType="US" />
        <ToDoList value={value} />
      </div>
    );
  }
}
