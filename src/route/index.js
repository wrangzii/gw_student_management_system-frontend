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
  Class,
  Term,
  Major,
  Subject,
  NotFound,
} from "~/components/pages";

const privateRoutes = [
  { path: "department/*", component: Department },
  { path: "program/*", component: Program },
  { path: "role/*", component: Role },
  { path: "student/*", component: Student },
  { path: "user/*", component: User },
  { path: "class/*", component: Class },
  { path: "term/*", component: Term },
  { path: "subject/*", component: Subject },
  { path: "major/*", component: Major },
];
const publicRoutes = [
  { path: "/", component: Dashboard },
  { path: "login", component: Login },
  { path: "forgot-password", component: ForgotPassword },
  { path: "reset-password", component: ResetPassword },
  { path: "*", component: NotFound },
];

export { privateRoutes, publicRoutes };
