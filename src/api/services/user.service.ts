import { apiClient } from 'api/axios';
import { AxiosResponse } from 'axios';
import { UserProfile } from 'shared/types';

const getUserProfile = async () => {
  const { data }: AxiosResponse<UserProfile> = await apiClient.get('/user-profiles');

  return data;
};

const userService = {
  getUserProfile,
};

export default userService;
