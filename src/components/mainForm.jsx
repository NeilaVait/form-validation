import React, { Component } from 'react';

class MainForm extends Component {
  state = {
    account: {},
  };

  handleForm(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="main-form">
        <h1>Main form</h1>
        <form onSubmit={this.handleForm}>
          <input type="text" autoComplete="off" name="username" placeholder="Username" />
          <input type="text" autoComplete="off" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="reapeatPassword" placeholder="Repeat password" />
          <div>
            <label htmlFor="agreement">I agree</label>
            <input id="checkbox" name="checkbox" type="checkbox"></input>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MainForm;
