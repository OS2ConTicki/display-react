import React from "react";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import EventComponent from "./components/event";
import Conference from "./components/conference";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/konference" component={Conference}></Route>
          <Route path="/event/:id" component={EventComponent}></Route>
          <Redirect from="/" to="/konference" />
        </Switch>
      </main>
    </>
  );
}

export default App;
