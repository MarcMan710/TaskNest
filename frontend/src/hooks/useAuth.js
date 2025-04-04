// This hook provides access to the authentication context, allowing components to access authentication state and functions.
import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return useMemo(() => context, [context]);
};

export default useAuth;
