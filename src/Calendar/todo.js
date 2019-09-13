import React, { Component } from "react";
import deleteButton from "./image/delete.png";
import resetButton from "./image/reset.png";
import Overlay from "./overlay.js";
import "./reset.css";
import "./todo.css";

export class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], completedItems: [], value: "", overlay: "none " };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetItems = this.resetItems.bind(this);
    this.removeTask = this.removeTask.bind(this);
    //this.changeDone = this.changeDone.bind(this);
    //  this.changeColor = this.changeColor.bind(this);
    //this.addToCompletedItems = this.addToCompletedItems.bind(this);
  }

  //event handler for when user adds text to form
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //event handler for when a new item is submitted into the form
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
    /*localStorage used to save information from previous sessions
      JSON.stringify to convert to string
    */
  }

  //called after render()
  componentDidMount() {
    const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
      1}${this.props.value.getFullYear()}`;
    const toDos = JSON.parse(localStorage.getItem(date));
    this.setState({
      items: toDos || []
    });
  }

  //called when props value changes, i.e. the current selected date
  componentWillReceiveProps(newProps) {
    const date = `${newProps.value.getDate()}${newProps.value.getMonth() +
      1}${newProps.value.getFullYear()}`;
    const toDos = JSON.parse(localStorage.getItem(date));
    this.setState({
      items: toDos || []
    });
  }

  //used to clear local storage, and set items to empty - used for reset scenario
  resetItems() {
    window.localStorage.clear();
    this.setState({
      items: []
    });
  }

  //used to remove task, task identified by id (position in items object)
  removeTask(id) {
    var newItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: newItems
    });
    const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
      1}${this.props.value.getFullYear()}`;
    localStorage.setItem(date, JSON.stringify(newItems));
  }

  //used to change done value, called when checkbox is clicked
  changeDone(id) {
    this.setState((state) => {
      state.items[id].done = !state.items[id].done;
      return {
        items: state.items
      };
    });
  }


  // //method to add an item from todos to completed items
  // addToCompletedItems(itemId) {
  //   var itemArray = this.state.items.filter(item => item.id === itemId);
  //   var item = itemArray[0];
  //   var currentIndex = this.state.items.indexOf(item);
  //   var newItems = this.state.items.filter(item => item.id !== itemId);
  //   console.log(currentIndex);
  //   this.setState((state) => {
  //     state.completedItems.push({
  //       id: itemId,
  //       name: state.items[currentIndex].name,
  //       done: state.items[currentIndex].done
  //     });
  //     return {
  //       items: newItems,
  //       completedItems: state.completedItems || []
  //     };
  //   });
  //   const date = `${this.props.value.getDate()}${this.props.value.getMonth() +
  //     1}${this.props.value.getFullYear()}`;
  //   localStorage.setItem(date, JSON.stringify(newItems));
  //   localStorage.setItem(date, JSON.stringify(this.state.completedItems));
  //   console.log(this.state.completedItems);
  // }

  render() {
    return (
      <div className="mainWrap">
        <div className="header">
          <div className="menuLine">
            {/* display current selected date */}
            <p id="todayDate">
              {this.props.value.getFullYear() +
                "-" +
                (this.props.value.getMonth() + 1) +
                "-" +
                this.props.value.getDate()}
            </p>

            {/* Reset button */}
            <button
              id="reset"
              onClick={() => this.setState({ overlay: "block" })}
            >
              <img src={resetButton} alt="reset" id="resetIcon" />
            </button>
          </div>

          {/* overlay.js gets displayed on reset's onClick handler */}
          <Overlay
            onYes={() => {
              this.resetItems();
              this.setState({ overlay: "none" });
            }}
            onNo={() => this.setState({ overlay: "none" })}
            style={{ display: this.state.overlay }}
          />

          {/* form, where user inputs tasks */}
          <form onSubmit={this.handleSubmit} id="formMenu">
            <input
              id="inputBar"
              type="text"
              placeholder="Today's Task"
              onChange={this.handleChange}
              ref={input => (this.textInput = input)}
            />

            {/* submit button */}
            <button type="submit" disabled={!this.state.value} id="addTask">
              Add Task
            </button>
          </form>

          {/* task list, created when this.state.items is true */}
          <p>TODOs: </p>
          <ul id="listInterface">
            {this.state.items ? (
              this.state.items.filter(item => !item.done).map(item => (
                <li key={item.id} className="list">
                  <div id="listItem">
                    <button
                      id="remove"
                      onClick={() => this.removeTask(item.id)}
                    >
                      <img src={deleteButton} alt="delete" id="deleteIcon" />
                    </button>
                    <button onClick={() => this.changeDone(item.id)}>
                      <img src={resetButton} alt="add" id="completeIcon" />
                    </button>
                    <p id="itemName">
                      {item.name}
                    </p>
                  </div>
                </li>
              ))
            ) : (
                <div />
              )}
          </ul>
          <p>COMPLETED: </p>
          <ul>
            {this.state.items ? (
              this.state.items.filter(item => item.done).map(item => (
                <li key={item.id} className="list">
                  <div id="listItem">
                    <button
                      id="remove"
                      onClick={() => this.removeTask(item.id)}
                    >
                      <img src={deleteButton} alt="delete" id="deleteIcon" />
                    </button>
                    <p id="itemName">
                      {item.name}
                    </p>
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
