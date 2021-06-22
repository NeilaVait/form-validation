import React, { Component } from 'react';

class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      reapeatPassword: '',
      agreement: '',
    },
    errors: {},
  };

  validateForm() {
    if (this.state.account.username.length === 0) {
      this.setState({ errors: { username: 'Cannot be blank' } });
      return;
    }
    if (this.state.account.username.length <= 3) {
      this.setState({ errors: { username: 'Username should be at least 4 letters' } });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: '' });
    this.validateForm();
  };

  handleChange = (event) => {
    this.setState({ account: { ...this.state.account, [event.target.name]: event.target.value } });
  };

  handleCheck = (event) => {
    console.log(event.target.checked);
    this.setState({ account: { ...this.state.account, agreement: event.target.checked } });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="main-form">
        <h1>Main form</h1>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            className={'input ' + (errors.username && 'is-invalid')}
            onChange={this.handleChange}
            value={account.username}
            type="text"
            name="username"
            placeholder="Username"
          />
          {errors.username && <p className="error-message">{errors.username}</p>}

          <input onChange={this.handleChange} value={account.email} type="text" name="email" placeholder="Email" />
          <input
            onChange={this.handleChange}
            value={account.password}
            type="text"
            name="password"
            placeholder="Password"
          />
          <input
            onChange={this.handleChange}
            value={account.reapeatPassword}
            type="text"
            name="reapeatPassword"
            placeholder="Repeat password"
          />
          <div>
            <label htmlFor="agreement">I agree</label>
            <input
              onChange={this.handleCheck}
              value={account.agreement}
              id="agreement"
              name="agreement"
              type="checkbox"
            ></input>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MainForm;
