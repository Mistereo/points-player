import '../styles/logo.css';

import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { pure } from 'recompose';


const Logo = ({
  className,
  blueColor = '#4A90E2',
  redColor = '#FC502D',
  title = 'Точки',
  subtitle = '',
}) => {
  const classes = classNames(
    className,
    'logo'
  );
  return (
    <div className={classes}>
      <svg className="logo__image" width="28" height="28">
        <circle cx="6" cy="6" r="6" fill={redColor} />
        <circle cx="22" cy="6" r="6" fill={blueColor} />
        <circle cx="6" cy="22" r="6" fill={blueColor} />
        <circle cx="22" cy="22" r="6" fill={redColor} />
      </svg>
      <span className="logo__title">
        {title} <span className="logo__subtitle">{subtitle}</span>
      </span>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  blueColor: PropTypes.string,
  redColor: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default pure(Logo);
