import PropTypes from "prop-types";
const Layout = ({ children }) => {
  return <div className="container d-flex">{children}</div>;
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
