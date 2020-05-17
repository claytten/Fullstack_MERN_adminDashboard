/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewListCreateForm from './components/NewListCreateForm';
import { createUser } from '../../../../redux/actions/accountActions';

class ListCreate extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = (formValues) => {
    const { dispatch } = this.props;
    formValues['roles'] = formValues.roles.value;
    
    const userData = {
      id: this.props.auth.user.id,
      formValues : formValues,
    }
    dispatch(createUser(userData, this.props.history));
    
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/account/list" />;
    }

    return (
      <Container className="dashboard">
        <Row>
          <NewListCreateForm onSubmit={this.handleSubmit}/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ListCreate);
