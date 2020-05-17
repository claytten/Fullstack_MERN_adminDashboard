/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationSystem from 'rc-notification';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import { BasicNotification } from '../../shared/components/Notification';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import {
  SidebarProps, UserProps,
} from '../../shared/prop-types/ReducerProps';

let notification = null;

const showNotification = (location) => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to the DashDev!"
      message="You have successfully registered in the DashDev. "
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: `right-up ${location}-support`,
  });
};

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    user: UserProps.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  componentDidMount() {
    const { location } = this.props;
    NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
    setTimeout(() => showNotification(location.pathname), 700);
  }

  // componentWillUnmount() {
  //   notification.destroy();
  // }

  changeSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeMobileSidebarVisibility());
  };

  render() {
    const {
      sidebar, user,
    } = this.props;

    return (
      <div className="layout--collapse layout--top-navigation">
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
          user={user}
        />
        <SidebarMobile
          sidebar={sidebar}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
        <Sidebar
          sidebar={sidebar}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  sidebar: state.sidebar,
  user: state.user,
}))(Layout));
