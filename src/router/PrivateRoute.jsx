import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../auth";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  const { search, pathname } = useLocation();

  const lastPath = search + pathname;

  localStorage.setItem("lastPath", lastPath);

  return logged ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
};
