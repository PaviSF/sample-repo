import Auth from '@actions/auth';
import { RegisterData } from '@interfaces/Register';
import { useState } from 'react';

interface RegisterHookResult {
  loading: boolean;
  register: (registerDetails: RegisterData, changeAlertBoxState: () => void) => Promise<void>;
}

const useRegister = (): RegisterHookResult => {
  const [loading, setLoading] = useState(false);

  const register = async (
    registerDetails: RegisterData,
    changeAlertBoxState: () => void,
  ): Promise<void> => {
    setLoading(true);
    await Auth.register(registerDetails, changeAlertBoxState);
    setLoading(false);
    // You can also store the user's authentication state here if needed
  };
  return { loading, register };
};

export default useRegister;
