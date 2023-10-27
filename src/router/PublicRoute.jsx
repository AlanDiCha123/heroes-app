import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../auth";

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  return logged ? <Navigate to="/marvel" /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.any.isRequired,
};
