import PropTypes from "prop-types";
import warningIcon from "../styles/images/warning-icon.png";
/** 알림창 */
const Alert = ({ message }) => {
  return (
    <div className="alert">
      <img src={warningIcon} width={"25px"} />
      <h3>{message}</h3>
    </div>
  );
};
Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Alert;
