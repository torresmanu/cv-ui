import React from "react";
import { Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes, landing as landingRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import LandingLayout from "../layouts/Landing";  // Import the new Landing layout
import Page404 from "../pages/auth/Page404";
import { Suspense } from "react";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
  <Switch>
    {/* Dashboard Layout Routes */}
    {childRoutes(DashboardLayout, dashboardRoutes)}
    
    {/* Auth Layout Routes */}
    {childRoutes(AuthLayout, authRoutes)}
    
    {/* Landing Layout Routes */}
    {childRoutes(LandingLayout, landingRoutes)}
    
    {/* Fallback Route */}
    <Suspense fallback={<div>Loading...</div>}>
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Suspense>
  </Switch>
);

export default Routes;