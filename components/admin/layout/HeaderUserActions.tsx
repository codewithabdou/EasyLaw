import React from "react";
import Header from "./header";
import { getLoggedInUserInfo } from "@services/authentication.service";

const HeaderUserActions = async () => {
  const user = await getLoggedInUserInfo();

  return <Header user={user} />;
};

export default HeaderUserActions;
