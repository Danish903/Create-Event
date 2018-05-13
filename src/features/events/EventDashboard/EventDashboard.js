import React, { Component } from "react";
import { Button, Grid } from "semantic-ui-react";
import uuid from "uuid/v4";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
const eventsDashBoard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: eventsDashBoard,
    isOpen: false,
    selectedEvent: null
  };
  handleOpenEvent = eventToOpen => () => {
    // console.log(eventToUpdate);
    this.setState(prevState => {
      return {
        ...prevState,
        selectedEvent: eventToOpen,
        isOpen: true
      };
    });
  };
  handleUpdateEvent = updatedEvent => {
    this.setState(prevState => {
      return {
        ...prevState,
        events: prevState.events.map(event => {
          if (event.id === updatedEvent.id) {
            return {
              ...event,
              ...updatedEvent
            };
          } else {
            return event;
          }
        }),
        isOpen: false,
        selectedEvent: null
      };
    });
  };
  handleFormOpen = () => {
    this.setState(prevState => {
      return { ...prevState, isOpen: !prevState.isOpen, selectedEvent: null };
    });
  };
  handleCreateEvent = newEvent => {
    newEvent.id = uuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    // newEvent.attendees = [];
    this.setState(prevState => {
      return {
        ...prevState,
        events: [...prevState.events, newEvent],
        isOpen: false
      };
    });
  };
  handleDeleteEvent = eventId => () => {
    this.setState(prevState => {
      return {
        ...prevState,
        events: prevState.events.filter(event => event.id !== eventId),
        isOpen: false,
        selectedEvent: null
      };
    });
  };
  render() {
    const { selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            onEventEdit={this.handleOpenEvent}
            events={this.state.events}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            content="create Event"
            positive
            onClick={this.handleFormOpen}
          />
          {this.state.isOpen && (
            <EventForm
              onCancel={this.handleFormOpen}
              createEvent={this.handleCreateEvent}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
