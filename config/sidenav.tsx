import React from "react";
import { BiUser } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

const ADMIN_SIDENAV_ITEMS = [
  {
    title: "لوحة القيادة",
    path: "/admin/dashboard",
    icon: <MdDashboard size={25} />,
  },
  {
    title: "المستخدمين",
    path: "/admin/users",
    icon: <BiUser size={25} />,
  },
];

export { ADMIN_SIDENAV_ITEMS };
