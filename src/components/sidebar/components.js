const components = [
  {
    title: "Dashboard",
    path: "/",
    icon: "fa-solid fa-chart-line",
    isActive: true,
  },
  {
    title: "Department",
    path: "/department/view",
    icon: "fa-solid fa-building",
    isActive: false,
  },
  {
    title: "Role",
    path: "/role/view",
    icon: "fa-solid fa-flag",
    isActive: false,
  },
  {
    title: "User",
    path: "/user/view",
    icon: "fa-solid fa-users",
    isActive: false,
  },
  {
    title: "Program",
    path: "/program/view",
    icon: "fa-solid fa-calendar",
    isActive: false,
  },
  {
    title: "Student",
    path: "/student/view",
    icon: "fa-solid fa-graduation-cap",
    isActive: false,
    children: [
      {
        title: "Honour Students",
        path: "/student/view/honour-students",
        icon: "fa-solid fa-medal",
      },
      {
        title: "Fail Subjects",
        path: "/student/view/fail-subjects",
        icon: "fa-solid fa-exclamation",
      },
      {
        title: "OJT Students",
        path: "/student/view/ojt-students",
        icon: "fa-solid fa-flag",
      },
    ],
  },
  {
    title: "Term",
    path: "/term/view",
    icon: "fa-solid fa-clock",
    isActive: false,
  },
  {
    title: "Subject",
    path: "/subject/view",
    icon: "fa-solid fa-book",
    isActive: false,
  },
  {
    title: "Major",
    path: "/major/view",
    icon: "fa-solid fa-star",
    isActive: false,
  },
  {
    title: "Class",
    path: "/student-class/view",
    icon: "fa-solid fa-school",
    isActive: false,
  },
];

export default components;
