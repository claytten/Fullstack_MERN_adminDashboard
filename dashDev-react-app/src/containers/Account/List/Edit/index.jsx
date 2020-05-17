/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewListEditForm from './components/NewListEditForm';
import { loadNewlistTableData, updateUser } from '../../../../redux/actions/accountActions';

class ListEdit extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(loadNewlistTableData(match.params.index));
  }

  handleSubmit = (formValues) => {
    const { dispatch, match } = this.props;
    formValues['roles'] = formValues.roles.value;
    
    const userData = {
      id: this.props.auth.user.id,
      idData: this.props.newList.items[match.params.index].id,
      index: match.params.index,
      formValues : formValues,
    }
    dispatch(updateUser(userData, this.props.history));
    
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
          <NewListEditForm onSubmit={this.handleSubmit}/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  newList: state.newList,
});

export default connect(mapStateToProps)(ListEdit);
