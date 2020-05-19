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
import { destroyAlert } from '../../redux/actions/alertActions';

let notification = null;

const showNotification = (location, message) => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to the DashDev!"
      message={message}
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
    let { location  } = this.props;
    NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
    setTimeout(() => showNotification(location.pathname, "You have successfully registered in the DashDev. "), 700);
    this.props.destroyAlert();
  }
  componentWillReceiveProps(nextProps) {
    let { location , alert } = nextProps;
    if(alert.success) {
      NotificationSystem.newInstance({ style: { top: 65 } }, n => notification = n);
      setTimeout(() => showNotification(location.pathname, alert.message), 700);
      nextProps.destroyAlert();
    }
  }

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

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  user: state.user,
  alert: state.alert
});

export default withRouter( connect(
  mapStateToProps,
  {destroyAlert}
)(Layout));
