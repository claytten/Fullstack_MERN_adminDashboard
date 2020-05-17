import PropTypes from 'prop-types';

const {
  string, shape, arrayOf, number,
} = PropTypes;

export const NewListRowProps = shape({
  id: string,
  firstName: string,
  lastName: string,
  email: number,
  roles: string
});

export const NewListTableProps = arrayOf(NewListRowProps);
