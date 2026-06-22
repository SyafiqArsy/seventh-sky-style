interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecommendationDetailPage(
  props: Props,
) {
  const params =
    await props.params;

  return (
    <div>
      Recommendation:
      {" "}
      {params.id}
    </div>
  );
}