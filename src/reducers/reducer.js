const defaultTimerReducer = {
  // logoutTime: 1000 * 60 * 3,
  // warningTime: 1000 * 60 * 2.9,
  logoutTime: 20,
  warningTime: 10,
  time: 1,
  start: 1,
  isOn: false,
  loggedIn: false,
  show: false,
  secondsRemaining: 10
};

export const timerReducer = (state = defaultTimerReducer, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loggedIn: true
      };

    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        secondsRemaining: undefined,
        isOn: false,
        show: false
      };

    case "START_TIMER":
      return {
        ...state,
        isOn: true,
        time: 1,
        start: Date.now() - state.time
      };

    case "TIME_ACTION":
      return {
        ...state,
        time: Date.now() - state.start
      };

    case "RESET_TIMER":
      return {
        ...state,
        time: 1,
        isOn: false
      };

    case "SECONDS":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
      };

    case "RESET_SECONDS":
      return {
        ...state,
        secondsRemaining: state.warningTime
      };

    default:
      return state;
  }
};
