import { useQuery, useQueryClient } from '@tanstack/react-query';
import userService from 'api/services/user.service';
import { queryKeys } from 'shared/constants';
import { User, UserProfile } from 'shared/types';

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

const getUser = async (user: User | null): Promise<UserProfile | null> => {
  if (!user) return null;
  const data = await userService.getUserProfile();

  return data;
};

export const useUser = (): UseUser => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line
  // @ts-ignore
  const { data: user } = useQuery([queryKeys.user], () => {
    return getUser(user);
  });
  const updateUser = (newUser: User) => {
    queryClient.setQueryData([queryKeys.user], newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData([queryKeys.user], null);
  };

  return { user, updateUser, clearUser };
};
