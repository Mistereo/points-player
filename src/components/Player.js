import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Markdown from 'react-remarkable';

import Tabs from './Tabs';
import CanvasField from './CanvasField';
import IconButton from './IconButton';
import Tree from './Tree';

import '../styles/player.css';


const Player = ({
  className,
  activeNode,
  game,
  cursor,
  navigation,
  navigationTree,
  actions,
}) => {
  const classes = classNames(
    className,
    'points-player',
  );

  const comment = activeNode.comment || '';

  return (
    <div className={classes}>
      <CanvasField
        game={game}
        className="points-player__field"
        activeNode={activeNode}
        onClick={(position) => {
          const move = {
            ...position,
            color: game.moving,
          };

          if (game.check(move)) {
            actions.addMove(cursor, move);
          }
        }}
      />
      <div className="points-player__sidebar">
        <div className="points-player__actions">
          <div className="points-player__actions-row">
            <IconButton
              icon="skip_previous"
              disabled={cursor === navigation.first}
              onClick={actions.selectMove.bind(null, navigation.first)}
            />
            <IconButton
              icon="navigate_before"
              disabled={cursor === navigation.previous}
              onClick={actions.selectMove.bind(null, navigation.previous)}
            />
            <IconButton
              icon="navigate_next"
              disabled={cursor === navigation.next}
              onClick={actions.selectMove.bind(null, navigation.next)}
            />
            <IconButton
              icon="skip_next"
              disabled={cursor === navigation.last}
              onClick={actions.selectMove.bind(null, navigation.last)}
            />

            <div className="mdl-layout-spacer"></div>

            <IconButton icon="expand_more" disabled />
            <IconButton id="player-menu" icon="more_vert" disabled />
          </div>
        </div>
        <Tabs
          className="points-player__tabs"
          tabs={[{
            label: 'Комментарии',
            content: <Markdown source={comment} />,
          }, {
            label: 'Информация',
            content: '',
          }]}
        />
        <Tree
          {...navigationTree}
          cursor={cursor}
          actions={actions}
        />
      </div>
    </div>
  );
};

Player.propTypes = {
  className: PropTypes.string,
  activeNode: PropTypes.object,
  game: PropTypes.object,
  cursor: PropTypes.number,
  navigation: PropTypes.object,
  navigationTree: PropTypes.object,
  actions: PropTypes.object,
};

export default Player;
