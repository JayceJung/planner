import React, { Component } from "react";
import deleteButton from "./image/delete.png";
import resetButton from "./image/reset.png";
import Overlay from "./overlay.js";
import "./reset.css";
import "./todo.css";

export class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], value: "", overlay: "none " };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetItems = this.resetItems.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var newItems = this.state.items.concat({
      id: this.state.items.length,
      name: this.state.value,
      done: false
    });
    this.setState({
      items: newItems,
      value: ""
    });
    this.textInput.value = "";
    const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
      1}${this.props.value.getFullYear()}`;
    localStorage.setItem(date, JSON.stringify(newItems));
  }

  componentDidMount() {
    const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
      1}${this.props.value.getFullYear()}`;
    const toDos = JSON.parse(localStorage.getItem(date));
    this.setState({
      items: toDos || []
    });
  }

  componentWillReceiveProps(newProps) {
    const date = `${newProps.value.getDate()}${newProps.value.getMonth() +
      1}${newProps.value.getFullYear()}`;
    const toDos = JSON.parse(localStorage.getItem(date));
    this.setState({
      items: toDos || []
    });
  }

  resetItems() {
    window.localStorage.clear();
    this.setState({
      items: []
    });
  }

  removeTask(id) {
    var newItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: newItems
    });
    const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
      1}${this.props.value.getFullYear()}`;
    localStorage.setItem(date, JSON.stringify(newItems));
  }

  render() {
    return (
      <div className="mainWrap">
        <div className="header">
          <div className="menuLine">
            <p id="todayDate">
              {this.props.value.getFullYear() +
                "-" +
                (this.props.value.getMonth() + 1) +
                "-" +
                this.props.value.getDate()}
            </p>
            <button
              id="reset"
              onClick={() => this.setState({ overlay: "block" })}
            >
              <img src={resetButton} alt="reset" id="resetIcon" />
            </button>
          </div>
          <Overlay
            onYes={() => {
              this.resetItems();
              this.setState({ overlay: "none" });
            }}
            onNo={() => this.setState({ overlay: "none" })}
            style={{ display: this.state.overlay }}
          />
          <form onSubmit={this.handleSubmit} id="formMenu">
            <input
              id="inputBar"
              type="text"
              placeholder="Today's Task"
              onChange={this.handleChange}
              ref={input => (this.textInput = input)}
            />
            <button type="submit" disabled={!this.state.value} id="addTask">
              {" "}
              Add Task{" "}
            </button>
          </form>
          <ul>
            {this.state.items ? (
              this.state.items.map(item => (
                <li key={item.id} id="list">
                  <div id="listItem">
                    <button
                      id="remove"
                      onClick={() => this.removeTask(item.id)}
                    >
                      <img src={deleteButton} alt="delete" id="deleteIcon" />
                    </button>
                    <p id="itemName">{item.name}</p>
                  </div>
                </li>
              ))
            ) : (
              <div />
            )}
          </ul>
        </div>
      </div>
    );
  }
}
