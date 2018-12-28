import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styledAuthContainer = {
  border: '1px solid red',
};

class Auth extends PureComponent {
  state = {
    email: '',
    password: '',
  };

  onChange = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const { email, password } = this.state;
    const { signIn, signUp } = this.props;
    return (
      <div style={styledAuthContainer}>
        <input
          type="text"
          name="email"
          placeholder="email"
          autoComplete="on"
          value={email}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="on"
          value={password}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        <button onClick={() => signIn({ ...this.state })}>Sign in</button>
        <button onClick={() => signUp({ ...this.state })}>Sign up</button>
      </div>
    );
  }
}

Auth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default Auth;
