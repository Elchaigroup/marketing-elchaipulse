type BrandLockupProps = {
  compact?: boolean;
  collapsible?: boolean;
  surface?: "adaptive" | "dark";
};

function BrandImages() {
  return (
    <>
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
    </>
  );
}

export function BrandLockup({
  compact = false,
  collapsible = false,
  surface = "adaptive",
}: BrandLockupProps) {
  return (
    <span
      className={`pulse-brand-lockup${compact ? " is-compact" : ""}${
        collapsible ? " is-scroll-collapsible" : ""
      }`}
      data-surface={surface}
      aria-hidden="true"
    >
      {collapsible ? (
        <>
          <span className="pulse-brand-orb-crop">
            <BrandImages />
          </span>
          <span className="pulse-brand-word-crop">
            <BrandImages />
          </span>
        </>
      ) : (
        <BrandImages />
      )}
    </span>
  );
}
