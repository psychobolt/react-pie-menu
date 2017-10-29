// @flow
import React from 'react';

import styles from './PieMenu.style';

type Props = {
  children: any,
  width: string,
  height: string,
  centerX: string,
  centerY: string,
  centerRadius: string,
  centerStyle: {},
};

const PieMenu = ({ // eslint-disable-line object-curly-newline
  width = '300px',
  height = '300px',
  centerX,
  centerY,
  centerRadius = '50px',
  children,
  centerStyle,
}: Props) => {
  const centralAngle = children.length ? 360 / children.length : 360;
  const deltaAngle = 90 - centralAngle;
  const startAngle = deltaAngle < 0 ? 45 : deltaAngle + (centralAngle / 2);
  const polar = centralAngle % 180 === 0;
  return (
    <div
      style={
        Object.assign({
          position: (centerX || centerY) ? 'absolute' : 'relative',
          top: `calc(${centerY} - ${height} / 2)`,
          left: `calc(${centerX} - ${width} / 2)`,
        }, styles.container)
      }
    >
      <nav style={styles.nav}>
        <ul style={Object.assign({ width, height }, styles.ul)}>
          {React.Children.map(children, (child, i) => {
            const rotate = startAngle + (centralAngle * i);
            const skew = polar ? 0 : deltaAngle;
            const newChild = React.cloneElement(child, {
              containerStyle: Object.assign({
                transform: `skew(${-skew}deg) rotate(${((polar ? 90 : centralAngle) / 2) - 90}deg)`,
                background: `radial-gradient(transparent ${centerRadius}, rgba(109, 109, 109, 0.925) ${centerRadius})`,
              }, child.props.containerStyle),
              focusStyle: Object.assign({
                background: `radial-gradient(transparent ${centerRadius}, #424242 ${centerRadius})`,
                color: 'white',
              }, child.props.focusStyle),
              contentStyle: Object.assign({
                transform: `rotate(${-centralAngle * i}deg)`,
                color: 'black',
              }, child.props.contentStyle),
            });
            return (
              <li style={Object.assign({
                transform: `rotate(${rotate}deg) skew(${skew}deg)`,
              }, styles.li)}
              >
                {newChild}
              </li>
            );
          })}
        </ul>
        <div style={
          Object.assign({
            top: `calc(50% - ${centerRadius})`,
            left: `calc(50% - ${centerRadius})`,
            width: `calc(2 * ${centerRadius})`,
            height: `calc(2 * ${centerRadius})`,
          }, styles.center, centerStyle)
        }
        />
      </nav>
    </div>
  );
};

export default PieMenu;
