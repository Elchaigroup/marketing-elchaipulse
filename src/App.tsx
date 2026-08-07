import { ArrowDown, ArrowUpRight, Mic2, Waves } from "lucide-react";
import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { MotionAwareVideo } from "@/components/ui/motion-aware-video";
import { ScrollMotion } from "@/components/ui/scroll-motion";

const waveform = [
  18, 34, 24, 52, 38, 72, 46, 86, 60, 42, 78, 54, 94, 64, 40, 82, 58, 32, 68,
  48, 26, 56, 36, 76, 50, 30, 62, 44, 22, 54, 70, 40, 84, 58, 36, 66, 46, 28,
];

function App() {
  return (
    <main>
      <ScrollMotion />
      <AnomalousMatterHero orbVideoSrc="/media/pulse-orb.mp4" />

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
          data-reveal="specimen"
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
        <div className="pulse-thesis-mark" aria-hidden="true" data-reveal="ring">
          <div className="pulse-thesis-ring">
            <Mic2 size={46} strokeWidth={1.1} />
          </div>
        </div>
        <div className="pulse-thesis-content">
          <p className="pulse-kicker">Why answers hold up</p>
          <h2 id="thesis-title" data-reveal="headline">
            Two kinds of search, fused for precision.
          </h2>
          <div className="pulse-thesis-columns" data-reveal="copy">
            <p>
              Semantic search finds passages that mean the same thing as your
              question, even when the wording differs.
            </p>
            <p>
              BM25 keyword search catches exact names, part numbers, acronyms, and
              references. Reciprocal rank fusion merges both result lists.
            </p>
          </div>
        </div>
      </section>

      <section className="pulse-principles" aria-labelledby="principles-title">
        <div className="pulse-principles-heading" data-reveal="copy">
          <p id="principles-title">What Pulse is built around</p>
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

      <section id="briefing" className="pulse-closing" aria-labelledby="closing-title">
        <div className="pulse-closing-orb" aria-hidden="true" data-reveal="closing-orb">
          <MotionAwareVideo src="/media/pulse-orb.mp4" preload="none" />
        </div>
        <div className="pulse-closing-content" data-reveal="closing">
          <p className="pulse-kicker pulse-brand-kicker">elchai pulse</p>
          <h2 id="closing-title">See it answer a question about your own documents.</h2>
          <p>
            Point Pulse at a folder of your material and ask something only your
            team would know. That’s the walkthrough.
          </p>
          <a
            className="pulse-closing-action focus-ring"
            href="mailto:hello@elchai.com?subject=Elchai%20Pulse%20walkthrough"
          >
            Book a walkthrough
            <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="pulse-footer">
        <a className="pulse-wordmark focus-ring" href="#top" aria-label="Back to top">
          <BrandLockup compact />
        </a>
        <p>Your knowledge, answered out loud.</p>
        <p>© {new Date().getFullYear()} elchai</p>
      </footer>
    </main>
  );
}

export default App;
