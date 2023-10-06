import style from './Container.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const Container = ({className, children}) => (
  <div className={cn(style.container, className)}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};
