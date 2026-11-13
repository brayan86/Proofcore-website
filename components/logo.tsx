import Image from "next/image";
import Link from "next/link";
import logoColor from "@/public/brand/proofcore-logo.png";
import logoWhite from "@/public/brand/proofcore-logo-white.png";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}

/** The wordmark is artwork: always the exported logo file, never re-typed text. */
export function Logo({ variant = "color", className = "h-8 w-auto", priority }: LogoProps) {
  return (
    <Link href="/" aria-label="ProofCore, ir al inicio" className="inline-flex shrink-0 rounded-md transition-transform duration-300 hover:scale-[1.03] active:scale-100">
      <Image
        src={variant === "white" ? logoWhite : logoColor}
        alt="ProofCore"
        className={className}
        priority={priority}
      />
    </Link>
  );
}
