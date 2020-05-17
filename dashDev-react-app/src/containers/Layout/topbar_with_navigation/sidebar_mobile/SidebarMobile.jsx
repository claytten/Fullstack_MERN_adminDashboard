import React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';
import { SidebarProps } from '../../../../shared/prop-types/ReducerProps';

const Sidebar = ({
  changeMobileSidebarVisibility, sidebar,
}) => {
  const sidebarClass = classNames({
    'sidebar sidebar--no-desktop': true,
    'sidebar--show': sidebar.show,
  });

  return (
    <div className={sidebarClass}>
      <button className="sidebar__back" type="button" onClick={changeMobileSidebarVisibility} />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: SidebarProps.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
};


export default Sidebar;
