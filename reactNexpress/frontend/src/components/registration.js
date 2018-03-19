import React, { Component } from 'react';
import Validation from 'react-validation';
import '../validation.js';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      msg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email
    }
    console.log(data);
    fetch('/users/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data);
    }).then(function(response) {
      if(response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(function(data) {
      console.log(data);
      if(data == 'success') {
        this.setState({
          msg: 'Thanks for registering'
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="container register-form">
        <Validation.components.Form 
          onSubmit={this.handleSubmit} method="POST">
          <label>Name</label>
          <Validation.components.Input 
            onChange={this.logChange} className="form-control" 
            value="" placeholder="John" 
            name="name" validations={["required"]} 
          />
          <div className="submit-section">
            <Validation.components.Button className="btn btn-uth-submit">
              Submit
            </Validation.components.Button>
          </div>
        </Validation.components.Form>
      </div>
    );
  }
}