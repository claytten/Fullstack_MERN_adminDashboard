import React, { Component } from 'react';
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
          <SidebarLink title="Dashboard" icon="home" route="/dashboard" onClick={this.hideSidebar} />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Account" icon="user">
            <SidebarLink title="Profile" route="/account/profile" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/log_in" />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
