import {
  ArrowDown,
  ArrowUpRight,
  Hash,
  ListOrdered,
  ScanSearch,
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
          <span>The problem</span>
          <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <div className="pulse-intro-body">
          <h2 id="product-title" data-reveal="headline">
            Your team already wrote the answer down.
          </h2>
          <div className="pulse-intro-copy" data-reveal="copy">
            <p>
              Onboarding guides, process notes, contracts, and meeting summaries—most
              firms already have the information. What they lack is a fast way to
              retrieve it.
            </p>
            <p className="pulse-muted">
              File search finds filenames, not answers. Pulse answers from the
              documents your team already maintains.
            </p>
          </div>
        </div>
      </section>

      <section id="demo" className="pulse-demonstration" aria-labelledby="demo-title">
        <div className="pulse-demo-copy">
          <div className="pulse-section-heading" data-reveal="signal">
            <span className="pulse-symbol" aria-hidden="true">
              <Waves size={18} strokeWidth={1.7} />
            </span>
            <p>How a turn works</p>
          </div>
          <h2 id="demo-title" data-reveal="headline">
            Press space. Ask. Listen.
          </h2>
          <p data-reveal="copy">
            Speak or type. Pulse transcribes the question, retrieves the passages
            that bear on it, and streams back a spoken answer.
          </p>
        </div>

        <div
          className="pulse-voice-object"
          aria-label="Example Pulse document conversation"
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
              <p>“What’s the notice period in the Rossi contract?”</p>
            </div>
            <div className="pulse-response">
              <span>Pulse</span>
              <p>“I found the relevant section. Here’s what the contract says.”</p>
            </div>
          </div>
          <p className="pulse-synthetic-note">
            Synthetic example; answers depend on your documents
          </p>
        </div>
      </section>

      <section id="thesis" className="pulse-thesis" aria-labelledby="thesis-title">
        <div className="pulse-thesis-content">
          <p className="pulse-kicker">Why answers hold up</p>
          <h2 id="thesis-title">Two kinds of search, fused for precision.</h2>
          <p className="pulse-thesis-summary">
            Pulse runs meaning-based and exact-term retrieval in parallel, then
            combines both rankings before an answer is formed.
          </p>

          <div className="pulse-thesis-methods">
            <article>
              <span>Semantic search</span>
              <h3>Meaning, even when the wording differs.</h3>
              <p>
                Finds passages that express the same idea as your question without
                requiring the same phrasing.
              </p>
            </article>
            <article>
              <span>BM25 keyword search</span>
              <h3>Exact terms, names, codes, and references.</h3>
              <p>
                Catches the precise language that semantic similarity can miss.
              </p>
            </article>
          </div>

          <div className="pulse-thesis-result">
            <span>Reciprocal rank fusion</span>
            <p>Both result lists become one ranked set of relevant passages.</p>
          </div>
        </div>

        <div className="pulse-thesis-visual" aria-hidden="true">
          <p className="pulse-fusion-index">RETRIEVAL / FUSION / 002</p>
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
              <ScanSearch size={20} strokeWidth={1.45} />
              <span>Meaning</span>
            </div>
            <div className="pulse-fusion-node pulse-fusion-node-keyword">
              <Hash size={20} strokeWidth={1.45} />
              <span>Exact terms</span>
            </div>
            <div className="pulse-fusion-core">
              <Waypoints size={32} strokeWidth={1.25} />
              <span>Fusion</span>
            </div>
            <div className="pulse-fusion-node pulse-fusion-node-output">
              <ListOrdered size={20} strokeWidth={1.45} />
              <span>Ranked passages</span>
            </div>
          </div>
          <p className="pulse-fusion-caption">
            Two retrieval signals. One evidence set.
          </p>
        </div>
      </section>

      <section
        id="foundations"
        className="pulse-principles"
        aria-labelledby="principles-title"
      >
        <div className="pulse-principles-heading" data-reveal="copy">
          <h2 id="principles-title">What Pulse is built around</h2>
          <p>A practical foundation for document-grounded answers.</p>
        </div>
        <div className="pulse-principles-list">
          <article
            data-reveal="row"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <span>Your existing files</span>
            <h3>Point Pulse at what you have.</h3>
            <p>
              It reads PDF, Word, Excel, Markdown, and plain text, with vision-based
              OCR for scanned PDFs.
            </p>
          </article>
          <article
            data-reveal="row"
            style={{ "--reveal-delay": "50ms" } as React.CSSProperties}
          >
            <span>Local embeddings</span>
            <h3>Keep the vector index on your infrastructure.</h3>
            <p>
              Indexing and querying do not require an embeddings API, and document
              text is not sent to an embeddings vendor.
            </p>
          </article>
          <article
            data-reveal="row"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            <span>Conversation memory</span>
            <h3>Ask a follow-up without starting over.</h3>
            <p>
              Pulse carries context within a conversation and can recall relevant
              exchanges from earlier conversations.
            </p>
          </article>
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
            href="mailto:pulse@elchaigroup.com?subject=Elchai%20Pulse%20walkthrough"
          >
            Book a walkthrough
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
              aria-label="Elchai Pulse — back to top"
            >
              <BrandLockup compact surface="dark" />
            </a>
            <p>
              Elchai Pulse is a document-grounded voice assistant for teams.
              Speak or type a question; Pulse searches your organisation’s own
              files, retrieves the passages that bear on it, and answers out
              loud. It reads PDF, Word, Excel, Markdown and plain text, including
              scanned PDFs via vision-based OCR.
            </p>
          </div>

          <nav className="pulse-footer-nav" aria-label="Footer navigation">
            <p className="pulse-footer-label">Explore</p>
            <ul>
              <li>
                <a className="focus-ring" href="#top">Overview</a>
              </li>
              <li>
                <a className="focus-ring" href="#product">Problem</a>
              </li>
              <li>
                <a className="focus-ring" href="#demo">Demo</a>
              </li>
              <li>
                <a className="focus-ring" href="#thesis">Method</a>
              </li>
              <li>
                <a className="focus-ring" href="#briefing">Contact</a>
              </li>
              <li>
                <a className="focus-ring" href="#security">Security</a>
              </li>
            </ul>
          </nav>

          <div className="pulse-footer-contact">
            <p className="pulse-footer-label">Contact</p>
            <a
              className="pulse-footer-email focus-ring"
              href="mailto:pulse@elchaigroup.com"
            >
              pulse@elchaigroup.com
            </a>
            <p>Questions about Pulse? Write to the product team.</p>
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
