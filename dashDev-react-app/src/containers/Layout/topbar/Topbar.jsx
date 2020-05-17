import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarSearch from './TopbarSearch';
import { UserProps } from '../../../shared/prop-types/ReducerProps';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    user: UserProps.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility, user } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link to="/"
              style={{
                fontSize: "30px",
                fontFamily: "'roboto',sans-serif",
                fontWeight: "bold",
                paddingTop: "6px"
              }} 
            >DASHDEV</Link>
          </div>
          <div className="topbar__right" style={{ display: "flex", flexDirection: "row-reverse", right:"0"}}>
            <TopbarSearch />
            <TopbarProfile user={user} />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
