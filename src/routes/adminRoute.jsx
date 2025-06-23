import React from "react";
import { Navigate } from "react-router-dom";
import AdminUseAuthStore from "../store/adminStore/adminAuthStore";

export default function AdminRoute({ children }) {
  const { token, isAdmin } = AdminUseAuthStore();

  if (!token || !isAdmin) {

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
