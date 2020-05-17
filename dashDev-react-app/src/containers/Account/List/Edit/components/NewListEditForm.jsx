import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import { Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import renderSelectField from '../../../../../shared/components/form/Select';

class NewListEditForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Edit {initialValues.title}</h5>
            </div>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Firstname</span>
                <div className="form__form-group-field">
                  <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="Firstname"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Lastname</span>
                <div className="form__form-group-field">
                  <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="Lastname"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Email</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Role</span>
                <div className="form__form-group-field">
                  <Field
                    name="roles"
                    id="roles"
                    placeholder={initialValues.roles}
                    component={renderSelectField}
                    options={[
                      { value: 'user', label: 'User' },
                      { value: 'admin', label: 'Admin' },
                      { value: 'superadmin', label: 'Superadmin'}
                    ]}
                    required
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit" style={{ marginRight: "10px"}}>Submit</Button>
                <Link className="btn btn-secondary" to="/account/list">Cancel</Link>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const newListEditForm = reduxForm({
  enableReinitialize: true,
  form: 'new_list_edit_form',
})(NewListEditForm);

const mapStateToProps = state => ({
  initialValues: state.newList.data,
});

export default connect(mapStateToProps)(newListEditForm);
