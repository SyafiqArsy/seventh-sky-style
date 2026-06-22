import { api } from "./api";

import {
  CreateFeedbackRequest,
} from "@/types/feedback.types";

export const feedbackService = {
  async create(
    payload: CreateFeedbackRequest,
  ) {
    const { data } =
      await api.post(
        "/recommendation-feedbacks",
        payload,
      );

    return data;
  },
};