import React from 'react';

import { Redirect, Route } from "react-router-dom";

function LoggedInRoute(props) {
  return (
    <Route
      render={({ location }) =>
        props.userData.id ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default LoggedInRoute;
