import React from "react";

import async from "../components/Async";

import {
  BarChart,
  Unlock,
  FileText,
  Users as UsersIcon
} from "react-feather";
import StorageIcon from '@material-ui/icons/Storage';

import {NeedsLogin, NoLogin} from "./auth";
import GLOBALS from "../services/GLOBALS.json";

// Auth components
const SignIn = NoLogin(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ForgotPassword = async(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

const Users = NeedsLogin(() => import("../pages/pages/Users/Users"));

//Database routes
const Dashboard = NeedsLogin(() => import("../pages/pages/Dashboard"));


const FreeDashboard = NeedsLogin(() => import("../pages/pages/FreeDashboard"));  

//Account Routes
const MyAccount = NeedsLogin(() => import("../pages/pages/Account/MyAccount"));

const Home = async(() => import("../pages/pages/home/Homepage"));

const homeRoutes = {
  id: "Home",
  path: "/",
  component: Home,
  children: null,
  hidden: true
};

const accountRoutes = {
  id: "My Account",
  path: "/my_account",
  component: MyAccount,
  children: null,
  hidden: true
};



const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  hidden: true,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/forgot-password",
      name: "Forgot Password",
      component: ForgotPassword
    },
    {
      path: "/reset_your_password/:id",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const DashboardRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  component: Dashboard,
  icon: <BarChart />,
};

const FreeDashboardRoutes = {
  id: "Free Dashboard",
  path: "/free_dashboard",
  component: FreeDashboard,
  icon: <BarChart />,
};

const landingRoutes = {
    path: "/landing",
    name: "Landing",
    component: Home,
};


export const dashboard = [
  accountRoutes,
  DashboardRoutes,
  FreeDashboardRoutes
];

export const auth = [authRoutes];

export const landing = [landingRoutes, homeRoutes];

export default [
  accountRoutes,
  DashboardRoutes,
  FreeDashboardRoutes,
];
