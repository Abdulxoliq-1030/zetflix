import PropTypes from "prop-types";

const Like = ({ isLiked, onLike }) => {
  return (
    <i
      className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}
      style={{ cursor: "pointer" }}
      onClick={onLike}
    />
  );
};

export default Like;

Like.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};
