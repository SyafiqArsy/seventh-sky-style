import RecommendationDetailClient
from "@/features/recommendation/recommendation-detail-client";

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
    <RecommendationDetailClient
      id={id}
    />
  );
}