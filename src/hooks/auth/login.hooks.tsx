import Auth from '@actions/auth';
import { Router } from 'expo-router';
import { useState } from 'react';

interface AuthHookResult {
  loading: boolean;
  login: (username: string, password: string, router: Router) => Promise<void>;
}

const useLogin = (): AuthHookResult => {
  const [loading, setLoading] = useState(false);
  const login = async (username: string, password: string, router: Router): Promise<void> => {
    setLoading(true);
    await Auth.login(username, password, router);
    setLoading(false);
  };
  return { loading, login };
};

export default useLogin;
