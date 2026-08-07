type BrandLockupProps = {
  compact?: boolean;
  surface?: "adaptive" | "dark";
};

export function BrandLockup({
  compact = false,
  surface = "adaptive",
}: BrandLockupProps) {
  return (
    <span
      className={`pulse-brand-lockup${compact ? " is-compact" : ""}`}
      data-surface={surface}
      aria-hidden="true"
    >
      <img
        className="pulse-brand-logo pulse-brand-logo-on-light"
        src="/media/pulse-lockup-on-light@2x.png"
        alt=""
        width="851"
        height="273"
      />
      <img
        className="pulse-brand-logo pulse-brand-logo-on-dark"
        src="/media/pulse-lockup-on-dark@2x.png"
        alt=""
        width="851"
        height="273"
      />
    </span>
  );
}
