import RecommendationDetailClient
from "@/features/recommendation/recommendation-detail-client";
import Navbar from "@/components/common/navbar";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(
  { params }: Props,
) {
  const { id } =
    await params;

  return (
    <>
      <Navbar />
      <RecommendationDetailClient
        id={id}
      />
    </>
  );
}