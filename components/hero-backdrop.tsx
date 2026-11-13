/** Animated grid and light blobs layered behind dark hero sections. */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora -top-32 right-[-10%] size-[28rem] bg-pc-sky/30" />
      <div
        className="aurora bottom-[-30%] left-[-10%] size-[26rem] bg-pc-teal/15"
        style={{ "--delay": "-5s" } as React.CSSProperties}
      />
      <div
        className="aurora top-1/3 left-1/2 size-80 bg-pc-electric/20"
        style={{ "--delay": "-9s" } as React.CSSProperties}
      />
      <div className="bg-grid-animated absolute inset-0" />
    </div>
  );
}
