import React from "react";
import { connect } from "react-redux";
import Timer from "./Timer";

class Modal extends React.Component {
  showHideClassName = this.props.show
    ? "modal display-block"
    : "modal display-none";

  handleClose = () => {
    clearInterval(this.timeRemaining);
    this.props.resetTimerFunc();
    this.props.callApi();
  };

  render() {
    return (
      <div className={this.showHideClassname}>
        <section className="modal-main">
          <h1>
            You will be automatically logged out in : <Timer />
          </h1>
          <button onClick={this.handleClose}>close</button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.show
  };
};

export default connect(mapStateToProps)(Modal);
