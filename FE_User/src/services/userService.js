import api from "../api"

const refresh_token = async (refreshToken) => {
  const response = await api.put('/user/refresh-token', {
    refreshToken: refreshToken
  });

  return response;
}

const userService = {
  refresh_token
}

export default userService