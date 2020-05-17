import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import { loginUser } from "../../../redux/actions/authActions";
import { BasicNotification } from '../Notification';
import NotificationSystem from 'rc-notification';

let notification = null;

const showNotification = (location) => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to the DashDev!"
      message="Please Login to Dashboard"
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: `right-up ${location}-support`,
  });
};

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
    this.showPassword = this.showPassword.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      const { location } = nextProps;
      NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
      setTimeout(() => showNotification(location.pathname), 700);
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    const {
      errorMessage, errorMsg, fieldUser
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Form className="form login-form" onSubmit={this.handleSubmit}>
        <Alert
          color="danger"
          isOpen={!!errorMessage || !!errorMsg}
        >
          {errorMessage}
          {errorMsg}
        </Alert>
        <div className="form__form-group">
          <span className="form__form-group-label">{fieldUser}</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="email"
              id="email"
              component="input"
              type="email"
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              id="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={this.onChange}
                  value={this.state.password}
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
            </button>
          </div>
        </div>
        <div className="account__btns">
          <Button className="account__btn" submit="true" color="primary">Sign In</Button>
          <Link className="btn btn-outline-primary account__btn" to="/register">Create
            Account
          </Link>
        </div>
      </Form>
    );
  }
}

LogInForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorMsg: PropTypes.string,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
  form: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  errorMsg: state.user.error,
  auth: state.auth,
  errors: state.errors
});

export default withRouter( connect(
  mapStateToProps,
  { loginUser }
)(reduxForm()(LogInForm)));
