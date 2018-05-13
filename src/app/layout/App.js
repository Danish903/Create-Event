import React, { Component } from "react";
import { Container } from 'semantic-ui-react';
import EventDashboard  from "../../features/events/EventDashboard/EventDashboard";
import Navbar from '../../features/nav/Navbar/Navbar'
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Container className="main">
          <EventDashboard/>
        </Container>
      </React.Fragment>
    );
  }
}
