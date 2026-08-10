import { Fingerprint, Network, ScanSearch, Server } from "lucide-react";
import { EncryptedText } from "./encrypted-text";

const privacyPrinciples = [
  {
    label: "Hosted environment",
    title: "Your files stay on the assigned server.",
    description:
      "The document library and retrieval index are stored in the VPS or server environment assigned to your organisation—not in a shared consumer chat workspace.",
    Icon: Server,
  },
  {
    label: "Local retrieval index",
    title: "Embeddings can remain on your infrastructure.",
    description:
      "Indexing and querying do not require an embeddings API, and document text is not sent to an embeddings vendor for those steps.",
    Icon: Fingerprint,
  },
  {
    label: "Grounded retrieval",
    title: "Answers begin with relevant source passages.",
    description:
      "Semantic and exact-keyword search locate the passages that bear on a question before Pulse produces an answer.",
    Icon: ScanSearch,
  },
] as const;

export function SecurityStory() {
  return (
    <section
      id="security"
      className="pulse-security-story"
      aria-labelledby="security-title"
      data-motion="security-story"
    >
      <div className="pulse-security-lead">
        <div className="pulse-security-copy">
          <p className="security-eyebrow">Security / Data privacy</p>
          <h2 id="security-title" className="pulse-security-title">
            <EncryptedText
              text="Your knowledge stays inside your deployment."
              revealDelayMs={32}
              flipDelayMs={52}
              encryptedClassName="security-character-encrypted"
              revealedClassName="security-character-revealed"
            />
          </h2>
          <p className="pulse-security-summary">
            Pulse is deployed within a dedicated VPS or server environment
            assigned to your organisation. Your documents and retrieval index
            remain inside that environment rather than being stored in a shared
            consumer assistant workspace.
          </p>
          <p className="pulse-security-boundary-note">
            Where connected model services are used, those processing boundaries
            are reviewed and documented as part of the deployment architecture.
          </p>
        </div>

        <div className="security-vault" aria-hidden="true">
          <div className="security-vault-orbit security-vault-orbit-outer" />
          <div className="security-vault-orbit security-vault-orbit-inner" />
          <div className="security-vault-core">
            <Network size={54} strokeWidth={1.05} />
          </div>
          <span>FILES</span>
          <span>INDEX</span>
          <span>ANSWER</span>
        </div>
      </div>

      <div className="pulse-security-architecture" aria-label="Data privacy principles">
        {privacyPrinciples.map(({ label, title, description, Icon }) => (
          <article key={label}>
            <div className="pulse-security-card-index">
              <span>{label}</span>
              <Icon size={23} strokeWidth={1.35} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
