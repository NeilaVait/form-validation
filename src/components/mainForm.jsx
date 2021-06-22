import React, { Component } from 'react';
import Joi from 'joi-browser';

class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: '',
    },
    errors: {},
  };

  // validacijos schema
  schema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(4).required(),
    repeatPassword: Joi.ref('password'),
    agreement: Joi.boolean().required(),
  };

  validateForm() {
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
    console.log(result);

    if (!result.error) return;

    const errors = {};
    // errors.username = result.error.details

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    console.log(' localerrors', errors);

    this.setState({ errors });

    // if (this.state.account.username.length === 0) {
    //   this.setState({ errors: { username: 'Cannot be blank' } });
    //   return;
    // }
    // if (this.state.account.username.length <= 3) {
    //   this.setState({ errors: { username: 'Username should be at least 4 letters' } });
    // }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: '' });
    this.validateForm();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ account: { ...this.state.account, [name]: value } });

    this.validateProperty(name, value);
  };

  validateProperty(name, value) {
    console.log(name, value);
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema);
    if (result.error) {
      console.log(result.error.details[0].message);
      this.setState({ errors: { ...this.state.errors, [name]: result.error.details[0].message } });
    } else {
      this.setState({ errors: { ...this.state.errors, [name]: '' } });
    }
  }

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

          <input
            className={'input ' + (errors.email && 'is-invalid')}
            onChange={this.handleChange}
            value={account.email}
            type="text"
            name="email"
            placeholder="Email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <input
            className={'input ' + (errors.password && 'is-invalid')}
            onChange={this.handleChange}
            value={account.password}
            type="text"
            name="password"
            placeholder="Password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          <input
            className={'input ' + (errors.reapeatPassword && 'is-invalid')}
            onChange={this.handleChange}
            value={account.reapeatPassword}
            type="text"
            name="repeatPassword"
            placeholder="Repeat password"
          />
          {errors.reapeatPassword && <p className="error-message">{errors.reapeatPassword}</p>}
          <div>
            <label htmlFor="agreement">I agree</label>
            <input
              className={'input ' + (errors.agreement && 'is-invalid')}
              onChange={this.handleCheck}
              value={account.agreement}
              id="agreement"
              name="agreement"
              type="checkbox"
            ></input>
            {errors.agreement && <p className="error-message">{errors.agreement}</p>}
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MainForm;
