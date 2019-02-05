import React from "react";
import { connect } from "react-redux";
import { seconds } from "../actions/action";

class Timer extends React.Component {
  componentDidMount() {
    return (this.timeRemaining = setInterval(() => {
      return this.props.dispatch(seconds());
    }, 1000));
  }

  componentWillUnmount() {
    return clearInterval(this.timeRemaining);
  }

  render() {
    return (
      <div>
        {this.props.secondsRemaining >= 0 ? this.props.secondsRemaining : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    secondsRemaining: state.secondsRemaining
  };
};

export default connect(mapStateToProps)(Timer);
