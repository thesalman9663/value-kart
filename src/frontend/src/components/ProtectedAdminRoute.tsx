import { isAdminAuthenticated } from "@/utils/admin";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;
}
