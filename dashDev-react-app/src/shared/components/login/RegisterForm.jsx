import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import { Button, Alert } from 'reactstrap';
import { registerUser } from "../../../redux/actions/authActions";
import PropTypes from 'prop-types';

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showPassword: false,
      errorMessage: '',
    };

    this.showPassword = this.showPassword.bind(this);
  }

  componentDidMount() {
    console.log(this.props.auth.isAuthenticated);
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errorMessage } = this.props;
    const { showPassword } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <Alert
          color="danger"
          isOpen={!!errorMessage}
        >
          {errorMessage}
        </Alert>
        <div className="form__form-group">
          <span className="form__form-group-label">FirstName</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              onChange={this.onChange}
              value={this.state.firstName}
              name="firstName"
              id="firstName"
              component="input"
              type="text"
              placeholder="FirstName"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">LastName</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              onChange={this.onChange}
              value={this.state.lastName}
              name="lastName"
              id="lastName"
              component="input"
              type="text"
              placeholder="lastName"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">E-mail</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <MailRuIcon />
            </div>
            <Field
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              name="email"
              component="input"
              type="email"
              placeholder="example@mail.com"
              required
            />
          </div>
        </div>
        <div className="form__form-group form__form-group--forgot">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              onChange={this.onChange}
              value={this.state.password}
              id="password"
              name="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
            </button>
          </div>
        </div>
        <div className="account__btns register__btns">
          <Button type="submit" color="primary" className="account__btn">
            Sign Up
          </Button>
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  auth: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  form: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  errorMsg: state.user.error,
  auth: state.auth,
  errors: state.errors
});

export default withRouter( connect(
  mapStateToProps,
  { registerUser }
)(reduxForm({form: 'register_form'})(RegisterForm)));
