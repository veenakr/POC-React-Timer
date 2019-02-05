import React, { Component } from "react";
import Modal from "./Modal";
import { connect } from "react-redux";
import {
  startLogin,
  startLogout,
  startTimerAction,
  timeAction,
  resetTimer,
  resetSeconds
} from "../actions/action";
import axios from "axios";

class App extends Component {
  eventsArr = ["click", "keydown", "scroll"];

  onEventHandler = () => {
    this.resetTimerFunc();
  };

  resetTimerFunc = () => {
    clearInterval(this.props.time);
    this.props.dispatch(resetTimer());
    this.props.dispatch(resetSeconds());
    this.props.dispatch(startTimerAction());
  };

  callApi = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const persons = res.data;
        console.log(persons);
      })
      .catch(error => alert(error));
  };

  login = () => {
    this.props.dispatch(resetTimer());
    this.props.dispatch(startLogin(this.props));

    this.startTimer();

    this.callApi();

    this.eventsArr.forEach(e => {
      window.addEventListener(e, this.onEventHandler);
    });
  };

  logout() {
    this.props.dispatch(startLogout());
    this.resetTimerFunc();
    window.location.reload();
  }

  startTimer = () => {
    this.props.dispatch(startTimerAction());
    this.timer = setInterval(() => this.props.dispatch(timeAction()), 1000);
  };

  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <h1>Welcome</h1>
        ) : (
          <button onClick={this.login}>Login</button>
        )}
        {Math.round(this.props.time / 1000) >= this.props.warningTime ? (
          this.props.secondsRemaining >= 0 ? (
            <Modal
              callApi={this.callApi}
              resetTimerFunc={this.resetTimerFunc}
            />
          ) : (
            this.logout()
          )
        ) : null}
        {Math.round(this.props.time / 1000) >= this.props.logoutTime
          ? this.logout()
          : null}
        <h3>timer: {Math.round(this.props.time / 1000)}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    time: state.time,
    isOn: state.isOn,
    logoutTime: state.logoutTime,
    warningTime: state.warningTime,
    secondsRemaining: state.secondsRemaining
  };
};

export default connect(mapStateToProps)(App);
