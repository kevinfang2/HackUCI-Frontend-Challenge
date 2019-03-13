import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      remainingChar: 500,
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegister(event) {
    fetch('https://tranquil-lowlands-24043.herokuapp.com/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first: this.state.firstName,
        last: this.state.lastName,
        email: this.state.email,
        message: this.state.message,
      }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data)
    });
    event.preventDefault();
  }


  render() {
    return (
      <div className="Modal">
        <div className="Modal-header">
          <h1>
            Feedback
          </h1>
          <form onSubmit={this.handleRegister}>
            <input name="firstName" type="text" value={this.state.firstName} onChange={this.formHandler} placeholder="First Name" required />
            <input name="lastName" type="text" value={this.state.lastName} onChange={this.formHandler} placeholder="Last name" required />
            <input name="email" type="email" value={this.state.email} onChange={this.formHandler} placeholder="john@example.com" required />
            <textarea name="message" maxLength="500" type="text" value={this.state.message} onChange={this.formHandler} placeholder="Message" required />
            <div className="remainingChar"> {this.state.message.length}/500</div>
            <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
    );
  }
}

export default Modal;
