import React, { Component } from "react";

export default function overlay(props) {
  return (
    <div id="overlay" style={props.style}>
      <div id="overlayText">
        <p> This will delete all your current ToDos.</p>
        <p> Are you sure about deleting it?</p>
        <button onClick={props.onYes}>Yes</button>
        <button onClick={props.onNo}> No </button>
      </div>
    </div>
  );
}
