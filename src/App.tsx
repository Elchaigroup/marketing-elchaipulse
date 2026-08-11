import {
  ArrowDown,
  ArrowUpRight,
  BookOpenText,
  MessageSquareText,
  UserCheck,
  Waypoints,
  Waves,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { MotionAwareVideo } from "@/components/ui/motion-aware-video";
import { ScrollMotion } from "@/components/ui/scroll-motion";
import { SecurityStory } from "@/components/ui/security-story";
import { SiteMotion } from "@/components/ui/site-motion";

const waveform = [
  18, 34, 24, 52, 38, 72, 46, 86, 60, 42, 78, 54, 94, 64, 40, 82, 58, 32, 68,
  48, 26, 56, 36, 76, 50, 30, 62, 44, 22, 54, 70, 40, 84, 58, 36, 66, 46, 28,
];

function App() {
  const siteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, "") !== "/security") return;

    const timeout = window.setTimeout(() => {
      document.getElementById("security")?.scrollIntoView({ block: "start" });
      window.history.replaceState(window.history.state, "", "/");
    }, 120);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main ref={siteRef}>
      <a className="pulse-skip-link" href="#product">
        Skip to main content
      </a>
      <ScrollMotion />
      <SiteMotion scope={siteRef} />
      <AnomalousMatterHero
        orbVideoSrc="/media/pulse-orb.mp4"
        orbPosterSrc="/media/pulse-orb-poster.jpg"
      />

      <section id="product" className="pulse-intro" aria-labelledby="product-title">
        <div className="pulse-section-rail">
          <span>Why Pulse</span>
          <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <div className="pulse-intro-body">
          <h2 id="product-title" data-reveal="headline">
            The answer exists. Finding it is the bottleneck.
          </h2>
          <div className="pulse-intro-copy" data-reveal="copy">
            <p>
              Important context is scattered across documents, meetings, inboxes,
              and spreadsheets. Teams lose time searching, repeating questions,
              and waiting for the one person who remembers.
            </p>
            <p className="pulse-muted">
              Pulse brings the right context forward quickly, so decisions keep
              moving without a search chain or knowledge bottleneck.
            </p>
          </div>
        </div>
      </section>

      <section id="demo" className="pulse-demonstration" aria-labelledby="demo-title">
        <div className="pulse-demonstration-inner">
          <div className="pulse-demo-copy">
            <div className="pulse-section-heading" data-reveal="signal">
              <span className="pulse-symbol" aria-hidden="true">
                <Waves size={18} strokeWidth={1.7} />
              </span>
              <p>Pulse in action</p>
            </div>
            <h2 id="demo-title" data-reveal="headline">
              Ask once. Move faster.
            </h2>
            <p data-reveal="copy">
              Ask Pulse by voice or text. It moves across your company’s knowledge,
              finds what matters, and responds in moments with the context your team
              needs to act.
            </p>
          </div>

          <div
            className="pulse-voice-object"
            aria-label="Synthetic Pulse workspace conversation"
            data-motion="voice-card"
          >
            <div className="pulse-listening-state">
              <span className="pulse-listening-dot" aria-hidden="true" />
              Listening
            </div>
            <div className="pulse-waveform" aria-hidden="true">
              {waveform.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  style={
                    {
                      "--wave-height": `${height}%`,
                      "--wave-delay": `${index * -38}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div className="pulse-transcript">
              <div>
                <span>You</span>
                <p>“What did we agree about the renewal timeline?”</p>
              </div>
              <div className="pulse-response">
                <span>Pulse</span>
                <p>
                  “The meeting record says the renewal stays annual, with pricing
                  reviewed in October.”
                </p>
              </div>
            </div>
            <p className="pulse-synthetic-note">
              Synthetic example; answers depend on your documents
            </p>
          </div>
        </div>
      </section>

      <section id="thesis" className="pulse-thesis" aria-labelledby="thesis-title">
        <div className="pulse-thesis-content">
          <p className="pulse-kicker">Control by design</p>
          <h2 id="thesis-title">Pulse proposes. You decide.</h2>
          <p className="pulse-thesis-summary">
            Pulse accelerates work without taking decisions away from people. It
            prepares proposed updates and holds every action for review.
          </p>

          <div className="pulse-thesis-methods">
            <article>
              <span>Human approval</span>
              <h3>Every proposal arrives ready for review.</h3>
              <p>
                Pulse turns new context into a clear suggested update, ready for a
                person to approve, refine, or dismiss.
              </p>
            </article>
            <article>
              <span>Operational control</span>
              <h3>Decision authority stays with your team.</h3>
              <p>
                Messages, calendar changes, and company records remain under human
                control from beginning to end.
              </p>
            </article>
          </div>

          <div className="pulse-thesis-result">
            <span>Trust by design</span>
            <p>
              Faster execution, clear accountability, and no ambiguity about who
              makes the final call.
            </p>
          </div>
        </div>

        <div className="pulse-thesis-visual" aria-hidden="true">
          <p className="pulse-fusion-index">CONTEXT / PROPOSAL / 002</p>
          <div className="pulse-fusion-diagram">
            <svg viewBox="0 0 520 600" preserveAspectRatio="xMidYMid meet">
              <path
                className="pulse-fusion-track"
                d="M82 120 C210 120 210 252 328 252"
              />
              <path
                className="pulse-fusion-track"
                d="M82 348 C210 348 216 252 328 252"
              />
              <path
                className="pulse-fusion-track"
                d="M328 324 C328 390 328 430 328 492"
              />
              <path
                className="pulse-fusion-flow pulse-fusion-flow-teal"
                pathLength="1"
                d="M82 120 C210 120 210 252 328 252"
              />
              <path
                className="pulse-fusion-flow pulse-fusion-flow-violet"
                pathLength="1"
                d="M82 348 C210 348 216 252 328 252"
              />
              <path
                className="pulse-fusion-flow pulse-fusion-flow-output"
                pathLength="1"
                d="M328 324 C328 390 328 430 328 492"
              />
            </svg>

            <div className="pulse-fusion-node pulse-fusion-node-semantic">
              <BookOpenText size={20} strokeWidth={1.45} />
              <span>Context</span>
            </div>
            <div className="pulse-fusion-node pulse-fusion-node-keyword">
              <MessageSquareText size={20} strokeWidth={1.45} />
              <span>New record</span>
            </div>
            <div className="pulse-fusion-core">
              <Waypoints size={32} strokeWidth={1.25} />
              <span>Proposal</span>
            </div>
            <div className="pulse-fusion-node pulse-fusion-node-output">
              <UserCheck size={20} strokeWidth={1.45} />
              <span>Your decision</span>
            </div>
          </div>
          <p className="pulse-fusion-caption">
            Pulse prepares the update. You choose what happens.
          </p>
        </div>
      </section>

      <SecurityStory />

      <section id="briefing" className="pulse-closing" aria-labelledby="closing-title">
        <div className="pulse-closing-orb" aria-hidden="true" data-reveal="closing-orb">
          <MotionAwareVideo
            src="/media/pulse-orb.mp4"
            poster="/media/pulse-orb-poster.jpg"
            preload="none"
          />
        </div>
        <div className="pulse-closing-content" data-reveal="closing">
          <h2 id="closing-title">See it answer a question about your own documents.</h2>
          <p>
            Point Pulse at a folder of your material and ask something only your
            team would know. That’s the walkthrough.
          </p>
          <a
            className="pulse-closing-action focus-ring"
            href="mailto:pulse@elchaigroup.com?subject=Elchai%20Pulse%20demo"
          >
            Contact for demo
            <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="pulse-footer">
        <div className="pulse-footer-main">
          <div className="pulse-footer-brand">
            <a
              className="pulse-wordmark focus-ring"
              href="#top"
              aria-label="Elchai Pulse, back to top"
            >
              <BrandLockup compact surface="dark" />
            </a>
            <p>
              Pulse turns company knowledge into fast, trusted answers by voice or
              text. It helps teams move from scattered information to confident
              decisions.
            </p>
          </div>

          <div className="pulse-footer-location">
            <p className="pulse-footer-label">Location</p>
            <p>Dubai, United Arab Emirates</p>
          </div>

          <div className="pulse-footer-contact">
            <p className="pulse-footer-label">Contact</p>
            <a
              className="pulse-footer-email focus-ring"
              href="mailto:pulse@elchaigroup.com"
            >
              pulse@elchaigroup.com
            </a>
            <p>Want to see Pulse work with your own documents? Contact the team.</p>
          </div>
        </div>

        <div className="pulse-footer-bottom">
          <p>© {new Date().getFullYear()} elchai. All rights reserved.</p>
          <a className="focus-ring" href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
