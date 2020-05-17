import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Dashboard" icon="home" route="/dashboard" />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Account" icon="user">
            <SidebarLink title="List" route="/account/list" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter( connect(
  mapStateToProps
)(SidebarContent));
