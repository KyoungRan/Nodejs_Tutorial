import React, { Component } from 'react';
import Modal from 'react-modal';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    let self = this;
    fetch('/users', {
      method: 'GET'
    }).then(function(response) {
      if(response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(function(data) {
      self.setState({
        users: data
      }).catch(err => {
        console.log('caught it!', err);
      })
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Member name</th>
                <th>Member email</th>
                <th>Blood Group</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(member => 
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.bloodGroup}</td>
                  <td>{member.phone_member}</td>
                  <td><a>Edit</a> | <a>Delete</a></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;