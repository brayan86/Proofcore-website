import { HeroBackdrop } from "./hero-backdrop";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-hero relative overflow-hidden">
      <HeroBackdrop />
      <div className="container-pc relative py-16 sm:py-20 md:py-24">
        <p className="eyebrow enter text-pc-teal!">{eyebrow}</p>
        <h1
          className="enter mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        <p
          className="enter mt-5 max-w-2xl text-base leading-relaxed text-blue-100/80 sm:text-lg"
          style={{ "--delay": "160ms" } as React.CSSProperties}
        >
          {description}
        </p>
        {children && (
          <div className="enter" style={{ "--delay": "240ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
