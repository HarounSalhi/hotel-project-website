import Reset from "../components/Reset";

const ResetLayout = ({ history }) => {
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="authlayout">
      {/* form */}
      <Reset />
      {/* actions */}
      <p className="reset_p" onClick={handleClick}>
        login ?
      </p>
    </div>
  );
};

export default ResetLayout;