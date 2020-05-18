/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'reactstrap';
import { reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import PropTypes from 'prop-types';
import { updateUser } from "../../../../redux/actions/updateActions";
import { deactivateUser } from "../../../../redux/actions/deleteActions";
import TextField from '@material-ui/core/TextField';
import authToken from '../../../../config/auth.js';

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      description: "",
      showPassword: false,
      errorMessage: ''
    }
    this.showPassword = this.showPassword.bind(this);
  }


  componentDidMount() {
    const { SERVER_URL } = process.env;
    axios
    .get(`http://${SERVER_URL}/api/user/update/${this.props.auth.user.id}`,
      {
        headers : {
          'x-access-token' : authToken.token
        }
      }
    )
    .then(res => {
      console.log(res.data.success);
      const { firstName, lastName, email, description } = res.data.data.User;
      if(res.data.success) {
        this.setState({
          firstName : firstName,
          lastName: lastName,
          email : email,
          description: description
        });
      }
    })
    .catch(err =>{
      console.log(err);
    });
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
    const { firstName, lastName, email, password, description } = this.state
    const userData = {
      id : this.props.auth.user.id,
      firstName : firstName,
      lastName : lastName,
      email : email,
      password: password,
      description: description
    };
    console.log(userData);

    this.props.updateUser(userData,this.props.history);
  };

  deactivateSubmit = e => {
    e.preventDefault();
    const userData = {
      id : this.props.auth.user.id
    }

    this.props.deactivateUser(userData,this.props.history);
  }

  resetSubmit = () => {
    this.setState({
      firstName : "",
      lastName: "",
      email : "",
      description: ""
    })
  }

  render() {
    const { showPassword } = this.state;

    return (
      <form className="material-form" onSubmit={this.handleSubmit}>
        <div>
          <span className="material-form__label">First Name</span>
          <TextField
            className="material-form__field"
            value={this.state.firstName}
            onChange={this.onChange}
            name="firstName"
            id="firstName"
            placeholder="firstName"
            type="text"
          />
        </div>
        <div>
          <span className="material-form__label">Last Name</span>
          <TextField
            className="material-form__field"
            value={this.state.lastName}
            onChange={this.onChange}
            name="lastName"
            id="lastName"
            placeholder="lastName"
            type="text"
          />
        </div>
        <div>
          <span className="material-form__label">Email</span>
          <TextField
            className="material-form__field"
            value={this.state.email}
            onChange={this.onChange}
            name="email"
            id="email"
            placeholder="email"
            type="email"
          />
        </div>
        <div>
          <span className="material-form__label">Password</span>
          <TextField
            className="material-form__field"
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            id="password"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
          />
          <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
          </button>
        </div>
        <div>
          <span className="material-form__label">Description</span>
          <TextField
            className="material-form__field"
            value={this.state.description}
            onChange={this.onChange}
            name="description"
            id="description"
            placeholder="Description"
            type="text"
          />
        </div>
        <ButtonToolbar className="form__button-toolbar">
          <Button color="primary" type="submit">Update profile</Button>
          <Button color="danger" onClick={this.deactivateSubmit}>
            Deactivate Account
          </Button>
          <Button type="button" onClick={this.resetSubmit}>
            Reset
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ProfileSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  form: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errorMsg: state.user.error,
  auth: state.auth,
  errors: state.errors
});

export default withRouter( connect(
  mapStateToProps,
  { updateUser,deactivateUser }
)(reduxForm({form: 'profile_settings_form'})(ProfileSettings)));
