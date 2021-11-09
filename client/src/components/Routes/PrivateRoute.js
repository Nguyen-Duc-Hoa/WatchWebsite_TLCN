import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({
  component: Component,
  path,
  exact,
  layout: Layout,
  isAuth,
  roles,
  onlyAdmin
}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if(isAuth && onlyAdmin && roles.includes("Admin")) {
          return <Component {...props} />;
        }
        if (isAuth && !onlyAdmin && (roles.includes("Admin") || roles.includes("Employee"))) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
