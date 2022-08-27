import classes from "./tag.module.scss";
import cx from "classnames";

const Tag = ({ children, color, centered, pointer }) => (
  <span
    className={cx(
      classes.tag,
      classes[`tag--${color}`],
      centered && classes.centered,
      pointer && classes.pointer
    )}>
    {children}
  </span>
);

export default Tag;
