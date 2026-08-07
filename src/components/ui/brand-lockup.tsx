type BrandLockupProps = {
  compact?: boolean;
};

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <span className={`pulse-brand-lockup${compact ? " is-compact" : ""}`}>
      <span className="pulse-logo-plaque">
        <img src="/media/elchai-logo.png" alt="" />
      </span>
      <span className="pulse-logo-product">pulse</span>
    </span>
  );
}
