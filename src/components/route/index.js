import {
  Login,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  Department,
  Program,
  Role,
  Student,
  User,
  NotFound,
} from "~/components/pages";

const privateRoutes = [
  { path: "/department", component: Department },
  { path: "/program", component: Program },
  { path: "/role", component: Role },
  { path: "/student", component: Student },
  { path: "/user", component: User },
  { path: "/not-found", component: NotFound },
];
const publicRoutes = [
  { path: "/", component: Dashboard },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },
];

export { privateRoutes, publicRoutes };
