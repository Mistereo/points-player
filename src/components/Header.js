import React from 'react';
import classNames from 'classnames';

import Logo from './Logo';

import '../styles/header.css';


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
        <Logo title={title}
              subtitle={subtitle}
              blueColor={blueColor}
              redColor={redColor}/>
        <div className="flex-spacer"></div>
      </div>
    </header>
  );
};

export default Header;
