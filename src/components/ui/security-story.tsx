import { Fingerprint, Network, ShieldCheck, UserRoundCheck } from "lucide-react";
import { EncryptedText } from "./encrypted-text";
import { SecurityHoverField } from "./security-hover-field";

const privacyPrinciples = [
  {
    label: "Data isolation",
    title: "A private environment for every company.",
    description:
      "Your workspace, credentials, and company memory are separated from every other Pulse deployment.",
    Icon: ShieldCheck,
  },
  {
    label: "Access control",
    title: "Only approved users get access.",
    description:
      "Access uses Google or Microsoft accounts from an approved list your company controls.",
    Icon: UserRoundCheck,
  },
  {
    label: "Protected company data",
    title: "Your company knowledge is never pooled.",
    description:
      "Your data is not combined with another company’s workspace or used as shared company memory.",
    Icon: Fingerprint,
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
      <SecurityHoverField />

      <div className="pulse-security-lead">
        <div className="pulse-security-copy">
          <p className="security-eyebrow">Security / Privacy / Data protection</p>
          <h2 id="security-title" className="pulse-security-title">
            <EncryptedText
              text="Your company knowledge stays protected."
              revealDelayMs={32}
              encryptedClassName="security-character-encrypted"
              revealedClassName="security-character-revealed"
            />
          </h2>
          <p className="pulse-security-summary">
            Pulse runs in an isolated company environment designed to keep each
            organisation’s documents, conversations, and memory separated from
            every other workspace.
          </p>
          <p className="pulse-security-boundary-note">
            Access is restricted to approved users through your company’s Google or
            Microsoft sign in.
          </p>
        </div>

        <div className="security-vault" aria-hidden="true">
          <div className="security-vault-orbit security-vault-orbit-outer" />
          <div className="security-vault-orbit security-vault-orbit-inner" />
          <div className="security-vault-core">
            <Network size={54} strokeWidth={1.05} />
          </div>
          <span>DATA</span>
          <span>ACCESS</span>
          <span>ISOLATION</span>
        </div>
      </div>

      <div className="pulse-security-architecture" aria-label="Pulse privacy principles">
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
