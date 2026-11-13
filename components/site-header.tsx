"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="header-scroll sticky top-0 z-40 border-b border-pc-line/80 bg-white/90 backdrop-blur-md">
      <div className="container-pc flex h-16 items-center justify-between gap-6 md:h-18">
        <Logo className="h-7 w-auto md:h-8" priority />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-pc-dark transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-pc-electric after:transition-transform after:duration-300 hover:text-pc-blue hover:after:scale-x-100 aria-[current=page]:text-pc-blue aria-[current=page]:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="btn-shine ml-3 rounded-lg bg-pc-electric px-4 py-2 whitespace-nowrap text-sm font-semibold text-white transition-all hover:bg-pc-blue hover:shadow-lg hover:shadow-pc-electric/30"
          >
            Hablar con ProofCore
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-pc-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Principal"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-pc-line bg-white motion-safe:animate-[enter_0.25s_ease_both] lg:hidden"
        >
          <ul className="container-pc flex flex-col py-3">
            {[...navigation, { href: "/contacto", label: "Contacto" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-md px-2 py-3 text-base font-medium text-pc-dark aria-[current=page]:text-pc-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
