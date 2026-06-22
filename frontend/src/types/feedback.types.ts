export type FeedbackType =
  | "LIKE"
  | "NEUTRAL"
  | "DISLIKE";

export interface CreateFeedbackRequest {
  recommendationItemId: string;
  feedback: FeedbackType;
}