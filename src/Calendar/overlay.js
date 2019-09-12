import React, { Component } from "react";

export default function overlay(props) {
  return (
    <div id="overlay" style={props.style}>
      <div id="overlayText">
        <p> This will delete all your current ToDos.</p>
        <p> Are you sure you want to delete?</p>
        <button className="deleteButton" onClick={props.onYes}>Yes</button>
        <button className="deleteButton" onClick={props.onNo}> No </button>
      </div>
    </div>
  );
}
