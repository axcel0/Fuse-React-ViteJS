import { FuseRouteItemType } from "@fuse/utils/FuseUtils";
import React, { lazy } from "react";

const CustomerList = lazy(() => import("./CustomerList"));

const CustomerListRoute: FuseRouteItemType = {
  path: "customers",
  element: <CustomerList />,
};

export default CustomerListRoute;
