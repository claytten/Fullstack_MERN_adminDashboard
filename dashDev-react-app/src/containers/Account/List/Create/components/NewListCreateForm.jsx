import React, { PureComponent } from 'react';
import {
  Button, ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import { Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EyeIcon from 'mdi-react/EyeIcon';
import renderSelectField from '../../../../../shared/components/form/Select';

class NewListCreateForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };

    this.showPassword = this.showPassword.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    const { handleSubmit } = this.props;
    const { showPassword } = this.state;
    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">Create</h5>
                    </div>
                    <form className="form form--horizontal" onSubmit={handleSubmit}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Firstname</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="firstName"
                                    id="firstName"
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
                                id="lastName"
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
                                id="email"
                                component="input"
                                type="email"
                                placeholder="Email"
                                required
                            />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Password</span>
                            <div className="form__form-group-field">
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
                        <div className="form__form-group">
                            <span className="form__form-group-label">Role</span>
                            <div className="form__form-group-field">
                            <Field
                                name="roles"
                                id="roles"
                                placeholder="Roles"
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

const newListCreateForm = reduxForm({
    enableReinitialize: true,
    form: 'new_list_create_form',
})(NewListCreateForm);

export default (newListCreateForm);
