import PropTypes from 'prop-types';

export const Svg = prop => {
  const {path, className, id} = prop;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}>
      <use xlinkHref={`${path}#${id}`}></use>
    </svg>
  );
};

Svg.propTypes = {
  path: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};
