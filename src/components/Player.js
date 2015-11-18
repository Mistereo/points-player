import React from 'react';
import classNames from 'classnames';

import Tabs from './Tabs';
import IconButton from './IconButton';


export default ({
  className,
}) => {
  const classes = classNames(
    className,
    'points-player',
  );
  return (
    <div className={classes}>
      <img className="points-player__field" src="http://placehold.it/740x600/ffffff/333333?text=Field" alt=""/>
      <div className="points-player__sidebar">
        <div className="points-player__actions">
          <div className="points-player__actions-row">
            <IconButton icon="skip_previous"/>
            <IconButton icon="navigate_before"/>
            <IconButton icon="navigate_next"/>
            <IconButton icon="skip_next"/>

            <div className="mdl-layout-spacer"></div>

            <IconButton icon="expand_more"/>
            <IconButton icon="more_vert"/>
          </div>
        </div>
        <Tabs className="points-player__tabs" tabs={[{
          label: 'Комментарии',
          content: 'Комментарии',
        }, {
          label: 'Информация',
          content: 'Информация',
        }]}/>
      </div>
    </div>
  );
};
