const Loader = ({ full = false }) => {
  const adds = full
    ? {
        position: "fixed",
        zIndex: 1,
        height: "100vh",
        width: "100vw",
        background: "#00000030",
      }
    : {};
  const style = {
    height: "100%",
    display: "grid",
    placeItems: "center",
    ...adds,
  };

  return (
    <div style={style}>
      <span className='spinner-border' />
    </div>
  );
};

export default Loader;
