/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Table,
} from 'reactstrap';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import { Link } from 'react-router-dom';
import { NewListTableProps } from '../../../../shared/prop-types/TablesProps';

import Panel from '../../../../shared/components/Panel';

const DropDownMore = ({ index, handleDeleteRow }) => (
  <UncontrolledDropdown className="dashboard__table-more">
    <DropdownToggle>
      <p><DotsHorizontalIcon /></p>
    </DropdownToggle>
    <DropdownMenu className="dropdown__menu">
      <Link to={`/account/list/edit/${index}`}><DropdownItem>Edit</DropdownItem></Link>
      <DropdownItem onClick={handleDeleteRow}>Delete</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

DropDownMore.propTypes = {
  index: PropTypes.number.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

const NewAccountList = ({ newList, onDeleteRow }) => (
  <Panel
    xl={12}
    lg={12}
    md={12}
    title="Management Account"
  >
    <Table responsive striped className="dashboard__table-orders">
      <thead>
        <tr>
          <th>Email</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Role</th>
          <th />
        </tr>
      </thead>
      <tbody >
        {newList.map((value, index) => (
          <tr key={index} >
            <td style={{ color: "white"}}>{value.email}</td>
            <td style={{ color: "white"}}>{value.firstName}</td>
            <td style={{ color: "white"}}>{value.lastName}</td>
            <td style={{ color: "white"}}>{value.roles}</td>
            <td>
              <DropDownMore index={index} handleDeleteRow={e => onDeleteRow(value.id, index, e)} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Panel>
);

NewAccountList.propTypes = {
  newList: NewListTableProps.isRequired,
  onDeleteRow: PropTypes.func.isRequired
};

export default (NewAccountList);
