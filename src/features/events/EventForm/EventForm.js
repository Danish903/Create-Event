import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

const initEvent = {
  title: "",
  date: "",
  city: "",
  venue: "",
  hostedBy: ""
};
class EventForm extends Component {
  state = {
    event: initEvent
  };

  componentDidMount() {
    if (this.props.selectedEvent) {
      this.setState(prevState => {
        return {
          ...prevState,
          ...prevState.event,
          event: this.props.selectedEvent
        };
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedEvent &&
      nextProps.selectedEvent.id !== this.props.selectedEvent.id
    ) {
      this.setState(prevState => {
        return {
          ...prevState,
          event: nextProps.selectedEvent || initEvent
        };
      });
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
    }
  };

  onInputChange = e => {
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState({
      event: newEvent
    });
  };
  render() {
    const {
      event: { title, date, city, venue, hostedBy }
    } = this.state;
    return (
      <Segment>
        <Form>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={title}
              onChange={this.onInputChange}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={date}
              onChange={this.onInputChange}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={city}
              onChange={this.onInputChange}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={venue}
              onChange={this.onInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={hostedBy}
              onChange={this.onInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit" onClick={this.onFormSubmit}>
            Submit
          </Button>
          <Button onClick={this.props.onCancel} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default EventForm;
