import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const ConferenceApp = {
  render: (config) => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App {...config} />
        </BrowserRouter>
      </React.StrictMode>,
      config.element
    );
  },
};

export default ConferenceApp;
