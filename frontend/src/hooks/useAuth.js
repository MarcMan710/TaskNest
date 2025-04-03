// This hook provides access to the authentication context, allowing components to access authentication state and functions.
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
