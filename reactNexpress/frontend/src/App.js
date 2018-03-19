import React, { Component } from 'react';

class App extends Component {

  state = {
    members: []
  }

  componentDidMount() {
    fetch('users')
      .then(res => res.json())
      .then(members => this.setState({
        members: members
      }));
  }

  render() {
    return (
      <div className="Users">
        <h1>Users</h1>
        {this.state.members.map(member =>
          <div key={member.id}>
            {member.id}>{member.name} {member.surname} - {member.email}
          </div>
        )}
      </div>
    );
  }
}

export default App;