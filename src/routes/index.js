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

// Pages components
const Permissions = NeedsLogin(() => import("../pages/pages/Account/Permissions"));
const OnBoard = NeedsLogin(() => import("../pages/pages/OnBoard"));
const Institutions = NeedsLogin(() => import("../pages/pages/Institutions/Institutions"));
const AddInstitution = NeedsLogin(() => import("../pages/pages/Institutions/addInstitution"));
const AddUser = NeedsLogin(() => import("../pages/pages/Users/addUser"));
const Users = NeedsLogin(() => import("../pages/pages/Users/Users"));
const MasterUsersList = NeedsLogin(() => import("../pages/pages/MasterUsersList/MasterUsersList"));
const Instances = NeedsLogin(() => import("../pages/pages/Institutions/Instances"));
const EditInstance = NeedsLogin(() => import("../pages/pages/Institutions/editInstance"));
const SetEvaluations = NeedsLogin(() => import("../pages/pages/Evaluations/SetEvaluations"));
//Stats components
const Stats = NeedsLogin(() => import("../pages/pages/Stats/index"));
const InstancesTable = NeedsLogin(() => import("../pages/pages/Stats/InstancesTable"));
const EvaluatorsTable = NeedsLogin(() => import("../pages/pages/Stats/EvaluatorsTable"));
const Dashboard = NeedsLogin(() => import("../pages/pages/Stats/Dashboard"));
const Failures = NeedsLogin(() => import("../pages/pages/Stats/Failures"));

//Database routes
const Database = NeedsLogin(() => import("../pages/pages/Database/Database"));  

//Account Routes
const MyAccount = NeedsLogin(() => import("../pages/pages/Account/MyAccount"));

const Home = NoLogin(() => import("../pages/pages/home/Homepage"));


const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canSeeKPI = permissions ? permissions['stats']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_SEE_KPI)) 
  || permissions['reports']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST))
  || permissions['reports']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST_EVALUATORS))
  || permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST)) : false;
const canGetFiltersDatabase = permissions ? permissions['research_db']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_RESEARCH_DB)) : false;
const canSearchDatabase = permissions ? permissions['research_db']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_SEARCH_DB)) : false;
const canSeeDatabase = canGetFiltersDatabase && canSearchDatabase;
const canSeeMasterList = permissions ? permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_SEE_MASTER_LIST)) : false;

const homeRoutes = {
  id: "Home",
  path: "/",
  component: OnBoard,
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

const institutionsRoutes = {
  id: "Institutions",
  path: "/institutions",
  component: Institutions,
  icon: <Unlock />,
  children: null,
};
const setEvaluationRoutes = {
  id: "Set Evaluations",
  path: "/setEvaluations",
  component: SetEvaluations,
  icon: <FileText />,
  hidden: false,
  children: null,
};
const masterUsersListRoutes = {
  id: "Master Users List",
  path: "/masterUsersList",
  component: MasterUsersList,
  icon: <UsersIcon />,
  children: null,
  hidden: !canSeeMasterList
};
const usersRoutes = {
  id: "Users",
  path: "/users",
  component: Users,
  children: null,
  hidden: true
};
const instancesRoutes = {
  id: "Instances",
  path: "/instances",
  component: Instances,
  children: null,
  hidden: true
};
const addInstitutionRoutes = {
  id: "Add Institution",
  path: "/addInstitution",
  component: AddInstitution,
  children: null,
  hidden: true
};
const addUserRoutes = {
  id: "Add User",
  path: "/addUser",
  component: AddUser,
  children: null,
  hidden: true
};
const editInstanceRoutes = {
  id: "Edit Instance",
  path: "/editInstance",
  component: EditInstance,
  children: null,
  hidden: true
};

const pagesRoutes = {
  id: "Permissions",
  path: "/permissions",
  icon: <Unlock />,
  component: Permissions,
  hidden: true
};


const StatsRoutes = {
  id: "Stats",
  icon: <BarChart />,
  hidden: !canSeeKPI,
  children: [
      {
        path: "/stats/evaluations",
        name: "Region Tasks Table",
        component: Stats
      },
      {
        path: "/stats/instances",
        name: "Instances Table",
        component: InstancesTable,
      },
      {
        path: "/stats/evaluators",
        name: "Evaluators Table",
        component: EvaluatorsTable,
      },
      {
        path: "/stats/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/stats/failures",
        name: "Quality Metrics",
        component: Failures,
      }
    ]
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

const DatabaseRoutes = {
  id: "Database",
  path: "/database",
  component: Database,
  icon: <StorageIcon />,
  hidden: !canSeeDatabase,
};

const landingRoutes = {
    path: "/landing",
    name: "Landing",
    component: Home,
};


export const dashboard = [
  homeRoutes,
  accountRoutes,
  pagesRoutes,
  institutionsRoutes,
  setEvaluationRoutes,
  addInstitutionRoutes,
  addUserRoutes,
  usersRoutes,
  instancesRoutes,
  editInstanceRoutes,
  masterUsersListRoutes,
  StatsRoutes,
  DatabaseRoutes
];

export const auth = [authRoutes];

export const landing = [landingRoutes];

export default [
  homeRoutes,
  accountRoutes,
  pagesRoutes,
  authRoutes,
  institutionsRoutes,
  setEvaluationRoutes,
  addInstitutionRoutes,
  addUserRoutes,
  usersRoutes,
  instancesRoutes,
  editInstanceRoutes,
  masterUsersListRoutes,
  StatsRoutes,
  DatabaseRoutes
];
