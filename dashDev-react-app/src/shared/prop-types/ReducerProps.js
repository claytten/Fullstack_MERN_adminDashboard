import PropTypes from 'prop-types';

const {
  string, shape,
} = PropTypes;

export const SidebarProps = shape({
  show: PropTypes.bool,
  collapse: PropTypes.bool,
});

export const UserProps = shape({
  fullName: string,
  avatar: string,
});
