import { apiClient } from 'api/axios';
import { AxiosResponse } from 'axios';
import { User } from 'shared/types';

import { useUser } from './useUser';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

const useAuth = (): UseAuth => {
  const { updateUser, clearUser } = useUser();

  const authServerCall = async (urlEndpoint: string, email: string, password: string): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await apiClient({
        method: 'POST',
        url: urlEndpoint,
        data: { email, password },
      });

      if (status === 400) {
        const title = 'message' in data ? data.message : 'Unauthorized';

        return;
      }

      if ('user' in data) {
        updateUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (email: string, password: string): Promise<void> => {
    authServerCall('/auth/signin', email, password);
  };
  const signup = async (email: string, password: string): Promise<void> => {
    authServerCall('/user', email, password);
  };

  const signout = (): void => {
    clearUser();
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
