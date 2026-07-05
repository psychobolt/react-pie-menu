import { type Props, Pie } from '@psychobolt/circle-ui-react/Pie';

export const PieMenu = ({
  className,
  style,
  innerRadius,
  children,
  ...props
}: Props) => (
  <Pie
    {...props}
    className={className}
    style={style}
    innerRadius={innerRadius}
    onContextMenu={(e) => e.preventDefault()}
  >
    {children}
  </Pie>
);
