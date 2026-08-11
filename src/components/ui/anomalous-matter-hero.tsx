import { lazy, Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { BrandLockup } from "./brand-lockup";
import { MotionAwareVideo } from "./motion-aware-video";
import { SlideTabs } from "./slide-tabs";
import { ThemeToggle } from "./theme-toggle";

// Set to true when the authentication experience is ready to launch.
const SIGN_IN_ENABLED = false;

export const GenerativeArtScene = lazy(() =>
  import("./generative-art-scene").then((module) => ({
    default: module.GenerativeArtScene,
  })),
);

type AnomalousMatterHeroProps = {
  subtitle?: string;
  description?: string;
  orbVideoSrc?: string;
  orbPosterSrc?: string;
};

export function AnomalousMatterHero({
  subtitle = "Your company’s knowledge, answered out loud.",
  description = "Pulse turns scattered company knowledge into clear answers in moments by voice or text, so teams move faster without losing control.",
  orbVideoSrc,
  orbPosterSrc,
}: AnomalousMatterHeroProps) {
  return (
    <section id="top" role="banner" className="pulse-hero">
      <a
        className="pulse-page-brand pulse-wordmark focus-ring"
        href="#top"
        aria-label="Pulse, back to top"
      >
        <BrandLockup compact collapsible />
      </a>

      <nav className="pulse-nav" aria-label="Primary navigation">
        <span aria-hidden="true" />
        <SlideTabs />
        <div className="pulse-nav-utilities">
          {SIGN_IN_ENABLED && (
            <a className="pulse-auth-link focus-ring" href="/login">
              Sign in
            </a>
          )}
          <ThemeToggle />
        </div>
      </nav>

      <div className="pulse-hero-grid">
        <div className="pulse-hero-copy">
          <h1>{subtitle}</h1>
          <p className="pulse-hero-description">{description}</p>
          <div className="pulse-hero-actions">
            <a
              className="pulse-demo-action focus-ring"
              href="mailto:pulse@elchaigroup.com?subject=Elchai%20Pulse%20demo"
            >
              <span className="pulse-demo-action-icon" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={2} />
              </span>
              Contact for demo
              <span className="pulse-demo-action-glint" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pulse-orb-stage" aria-label="Elchai Pulse AI chief of staff">
          <div className="pulse-orbit pulse-orbit-outer" aria-hidden="true" />
          <div className="pulse-orbit pulse-orbit-inner" aria-hidden="true" />
          <span
            className="pulse-specimen-label pulse-specimen-label-top"
            aria-hidden="true"
          >
            PULSE / 001
          </span>
          <span
            className="pulse-specimen-label pulse-specimen-label-bottom"
            aria-hidden="true"
          >
            CONTEXT · MEMORY · VOICE
          </span>
          <div className="pulse-video-shell">
            <Suspense fallback={<div className="pulse-orb-fallback" />}>
              {orbVideoSrc ? (
                <MotionAwareVideo
                  className="pulse-orb-video"
                  src={orbVideoSrc}
                  poster={orbPosterSrc}
                  preload="auto"
                />
              ) : (
                <GenerativeArtScene />
              )}
            </Suspense>
          </div>
        </div>

        <div className="pulse-hero-note">
          <span className="pulse-note-dot" aria-hidden="true" />
          <p>
            Ask by voice or text.
            <br />
            Answers in moments.
          </p>
        </div>
      </div>
    </section>
  );
}
