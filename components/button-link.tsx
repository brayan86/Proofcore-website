import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  primary:
    "btn-shine bg-pc-electric text-white hover:bg-pc-blue shadow-sm shadow-pc-electric/20 hover:shadow-lg hover:shadow-pc-electric/30",
  secondary:
    "bg-white text-pc-navy ring-1 ring-inset ring-pc-line hover:ring-pc-blue hover:text-pc-blue",
  "ghost-light":
    "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
  "ghost-dark": "text-pc-blue hover:text-pc-navy px-0!",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  arrow?: boolean;
}

export function ButtonLink({
  variant = "primary",
  arrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
