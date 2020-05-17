import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  render() {
    const {
      children, location,
    } = this.props;

    return (
      <div className={`theme-dark ${location.pathname}-support`} dir={location.pathname}>
        <div className="squared-corner-theme blocks-with-shadow-theme top-navigation">
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter((MainWrapper));
