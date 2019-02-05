import React from "react";
import "./App.css";
import MainApp from "./components/MainApp";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

export const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
