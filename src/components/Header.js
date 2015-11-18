import React from 'react';
import classNames from 'classnames';


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
        <svg className="logo-image" width="28" height="28">
          <circle cx="6" cy="6" r="6" fill={redColor}/>
          <circle cx="22" cy="6" r="6" fill={blueColor}/>
          <circle cx="6" cy="22" r="6" fill={blueColor}/>
          <circle cx="22" cy="22" r="6" fill={redColor}/>
        </svg>
        <span className="logo-title">
          {title} <span className="logo-subtitle">{subtitle}</span>
        </span>
        <div className="flex-spacer"></div>
      </div>
    </header>
  );
};

export default Header;
