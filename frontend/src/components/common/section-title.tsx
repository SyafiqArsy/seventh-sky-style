interface Props {
  title: string;
  subtitle?: string;
}

export function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-4xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}