import RecommendationHistoryClient
from "@/features/recommendation/recommendation-history-client";
import Navbar from "@/components/common/navbar";

export default function RecommendationPage() {
  return (
    <>
      <Navbar />
      <RecommendationHistoryClient />
    </>
  );
}