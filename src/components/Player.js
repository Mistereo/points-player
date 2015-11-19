import React from 'react';
import classNames from 'classnames';

import Tabs from './Tabs';
import CanvasField from './CanvasField';
import IconButton from './IconButton';


export default ({
  className,
  ...otherProps,
}) => {
  const classes = classNames(
    className,
    'points-player',
  );
  return (
    <div className={classes}>
      <CanvasField className="points-player__field" {...otherProps}/>
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
