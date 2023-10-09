import Auth from "@actions/auth";
import { useState } from "react";

interface AuthHookResult {
  loading: boolean;
  login: (username: string, password: string,router: any) => Promise<void>;
}

const useLogin = (): AuthHookResult => {
  const [loading, setLoading] = useState(false);
  const login = async (
    username: string,
    password: string,
    router: any
  ): Promise<void> => {
    try {
      setLoading(true);
      await Auth.login(username, password, router);
      setLoading(false);
      // You can also store the user's authentication state here if needed
    } catch (err) {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
