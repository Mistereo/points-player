import '../styles/header.css';

import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { pure } from 'recompose';

import Logo from './Logo';


const Header = ({
  className,
  blueColor = '#4A90E2',
  redColor = '#FC502D',
  title = 'Точки',
  subtitle = 'плеер',
}) => {
  const classes = classNames(
    className,
    'points-header'
  );
  return (
    <header className={classes}>
      <div className="points-header__row">
        <Logo
          title={title}
          subtitle={subtitle}
          blueColor={blueColor}
          redColor={redColor}
        />
        <div className="flex-spacer"></div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  blueColor: PropTypes.string,
  redColor: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default pure(Header);
