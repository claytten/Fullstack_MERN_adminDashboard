import React, { Component } from 'react';
import { Col, Container, Row,Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewAccountList from './components/NewAccountList';
import { NewListTableProps } from '../../../shared/prop-types/TablesProps';
import { getAllUsers, deleteUser, deleteNewListTableData } from '../../../redux/actions/accountActions';
import { Link } from 'react-router-dom';

class AccountList extends Component {
    constructor() {
        super();
        this.state = {
            collapse: false
        }
    }

    componentDidMount() {
        const userData = {
            id: this.props.auth.user.id
        }
        this.props.getAllUsers(userData);
        console.log("ini new list", this.props.newList);
    }

    onDeleteRow = (idData,index, e) => {
        console.log(index,e, "delete");
        const { newList } = this.props;
        e.preventDefault();
        const userData = {
            id : this.props.auth.user.id,
            idData : idData,
            index: index,
            data: newList
        }
        console.log(...newList,[...newList], newList);

        const arrayCopy = [...newList];
        arrayCopy.splice(index, 1);
        this.props.deleteNewListTableData(arrayCopy);

        this.props.deleteUser(userData, this.props.history);
    };

    render() {
        const {newList } = this.props;
        return(
            <Container className="dashboard">
                <Row md={12}>
                    <Col md={8}>
                        <h3 className="page-title">Happy Hacking!</h3>
                    </Col>
                    <Col md={4} style={{ textAlign: "right"}}>
                        <Link to="/account/list/create">
                            <Button color="success" className="square">Create</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <NewAccountList newList={newList} onDeleteRow={this.onDeleteRow}/>
                </Row>
            </Container>
        )
    }
}

AccountList.propTypes = {
    newList: NewListTableProps.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    newList: state.newList.items
});

export default connect(mapStateToProps,{ getAllUsers,deleteUser,deleteNewListTableData })(AccountList);
