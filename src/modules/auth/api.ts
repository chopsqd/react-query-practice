import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance.ts";

export type UserDTO = {
  id: string
  login: string
  password: string
}

export const authApi = {
  baseKey: "users",

  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [authApi.baseKey, "byId", id],
      queryFn: meta =>
        jsonApiInstance<UserDTO>(`/users/${id}`, {
          signal: meta.signal
        })
    });
  },

  loginUser: ({ login, password }: { login: string, password: string }) => {
    return jsonApiInstance<UserDTO[]>(
      `/users?login=${login}&password=${password}`
    ).then(r => r[0] as UserDTO | undefined);
  }
};
