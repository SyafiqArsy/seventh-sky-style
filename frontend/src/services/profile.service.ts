import { api } from "./api";

import {
  Profile,
} from "@/types/profile.types";

export const profileService = {
  async getMyProfile(): Promise<Profile> {
    const { data } =
      await api.get("/profiles/me");

    return data;
  },

  async updateProfile(
    payload: Partial<Profile>,
  ) {
    const { data } =
      await api.patch(
        "/profiles/me",
        payload,
      );

    return data;
  },
};