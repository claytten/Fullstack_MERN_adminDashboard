import React, {Component} from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import authToken from '../../../../config/auth.js';

const Ava = `${process.env.PUBLIC_URL}/img/12.png`;

class ProfileMain extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    }
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
      const { firstName, lastName, email } = res.data.data.User;
      if(res.data.success) {
        this.setState({
          firstName : firstName,
          lastName: lastName,
          email : email,
        });
      }
    })
    .catch(err =>{
      console.log(err);
    });
  }

  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody className="profile__card">
            <div className="profile__information">
              <div className="profile__avatar">
                <img src={Ava} alt="avatar" />
              </div>
              <div className="profile__data" style={{ paddingLeft: "25px"}}>
                <p className="profile__name">{ firstName} { lastName}</p>
                <p className="profile__contact">{ email }</p>
              </div>
            </div>
            <div className="profile__stats">
              <div className="profile__stat">
                <p className="profile__stat-number">05</p>
                <p className="profile__stat-title">Projects</p>
              </div>
              <div className="profile__stat">
                <p className="profile__stat-number">24</p>
                <p className="profile__stat-title">Tasks</p>
              </div>
              <div className="profile__stat">
                <p className="profile__stat-number">12</p>
                <p className="profile__stat-title">Reports</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(ProfileMain));
