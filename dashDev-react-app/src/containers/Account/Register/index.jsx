import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import RegisterForm from '../../../shared/components/login/RegisterForm';

class Register extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    error: '',
  };

  render() {
    const { error } = this.state;
    return (
      <div className="account account--not-photo">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to
                <span className="account__logo"> Dash
                  <span className="account__logo-accent">DEV</span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">Create an account</h4>
            </div>
            <RegisterForm  errorMessage={error} />
            <div className="account__have-account">
              <p>Already have an account? <Link to="/log_in">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
