import { Fragment } from "react";
import Tag from "./tag/tag";

const Tags = ({ separator, tags = [] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tags.map(({ label, ...props }, idx) => (
        <Fragment key={idx}>
          <Tag {...props}>{label}</Tag>
          {tags.length - 1 !== idx && separator}
        </Fragment>
      ))}
    </div>
  );
};

export default Tags;
