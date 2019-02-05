import { createStore } from "redux";
import { timerReducer } from "../reducers/reducer";

export default () => {
  const store = createStore(timerReducer);
  return store;
};
