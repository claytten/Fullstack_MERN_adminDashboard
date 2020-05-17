import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { UserProps } from '../../../shared/prop-types/ReducerProps';
import { logoutUser } from "../../../redux/actions/authActions";
import authToken from '../../../config/auth.js';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      firstName : "",
      lastName : "",
      collapse: false
    };
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
      console.log(this.state.email);
      const { firstName, lastName } = res.data.data.User;
      if(res.data.success) {
        this.setState({
          firstName : firstName,
          lastName: lastName,
        });
      }
    })
    .catch(err =>{
      console.log(err);
    });
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  logout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { collapse,firstName, lastName } = this.state;

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" type="button" onClick={this.toggle}>
          <img
            className="topbar__avatar-img"
            src={(Ava)}
            alt="avatar"
          />
          <p className="topbar__avatar-name" style={{ paddingLeft: "5px"}}>
            { firstName} { lastName}
          </p>
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
        <Collapse isOpen={collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink
              title="Account Settings"
              icon="cog"
              path="/account/profile"
              onClick={this.toggle}
            />
            <TopbarMenuLink
              title="Log Out"
              icon="exit"
              path="/log_in"
              onClick={this.logout}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

TopbarProfile.propTypes = {
  user: UserProps.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter( connect(
  mapStateToProps,
  { logoutUser }
)(TopbarProfile));
