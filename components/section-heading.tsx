interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center" ? "mx-auto text-center" : "";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${centered}`}>
      <p className={`eyebrow ${dark ? "text-pc-teal!" : ""}`}>{eyebrow}</p>
      <Heading
        className={`mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          dark ? "text-white" : "text-pc-navy"
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            dark ? "text-blue-100/80" : "text-pc-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
