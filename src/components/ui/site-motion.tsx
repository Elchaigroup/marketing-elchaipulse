import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SiteMotionProps = {
  scope: RefObject<HTMLElement | null>;
};

export function SiteMotion({ scope }: SiteMotionProps) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      document.documentElement.classList.add("gsap-motion");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = Array.from(
          root.querySelectorAll<HTMLElement>(
            ".pulse-hero-copy > h1, .pulse-hero-description, .pulse-hero-actions",
          ),
        );
        const orb = root.querySelector<HTMLElement>(".pulse-orb-stage");
        const heroNote = root.querySelector<HTMLElement>(".pulse-hero-note");

        const heroTimeline = gsap.timeline({
          defaults: { ease: "expo.out" },
        });

        heroTimeline.fromTo(
          heroItems,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.055 },
        );

        if (orb) {
          heroTimeline.fromTo(
            orb,
            { autoAlpha: 0, scale: 0.965 },
            { autoAlpha: 1, scale: 1, duration: 0.72 },
            0.1,
          );
        }

        if (heroNote) {
          heroTimeline.fromTo(
            heroNote,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.44 },
            0.2,
          );
        }

        heroTimeline.set(
          [...heroItems, orb, heroNote].filter(Boolean) as HTMLElement[],
          { clearProps: "transform,opacity,visibility" },
        );

        const voiceCard = root.querySelector<HTMLElement>(
          "[data-motion='voice-card']",
        );
        if (voiceCard) {
          const bars = Array.from(
            voiceCard.querySelectorAll<HTMLElement>(".pulse-waveform span"),
          );
          const transcriptRows = Array.from(
            voiceCard.querySelectorAll<HTMLElement>(
              ".pulse-transcript > div, .pulse-synthetic-note",
            ),
          );
          const listeningState = voiceCard.querySelector<HTMLElement>(
            ".pulse-listening-state",
          );

          gsap.set(bars, { animationPlayState: "paused" });

          const voiceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: voiceCard,
              start: "top 78%",
              toggleActions: "play none none none",
            },
            defaults: { ease: "power3.out" },
          });

          voiceTimeline.fromTo(
            voiceCard,
            { autoAlpha: 0, y: 24, scale: 0.985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.52 },
          );

          if (listeningState) {
            voiceTimeline.fromTo(
              listeningState,
              { autoAlpha: 0, x: -10 },
              { autoAlpha: 1, x: 0, duration: 0.3 },
              0.16,
            );
          }

          voiceTimeline
            .fromTo(
              bars,
              { autoAlpha: 0.24, scaleY: 0.24 },
              {
                autoAlpha: 1,
                scaleY: 1,
                duration: 0.42,
                stagger: 0.014,
              },
              0.2,
            )
            .fromTo(
              transcriptRows,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.06 },
              0.42,
            )
            .set(bars, {
              clearProps: "transform,opacity,visibility,animationPlayState",
            })
            .set(
              [voiceCard, listeningState, ...transcriptRows].filter(
                Boolean,
              ) as HTMLElement[],
              { clearProps: "transform,opacity,visibility" },
            );
        }

        const thesis = root.querySelector<HTMLElement>(".pulse-thesis");
        if (thesis) {
          const contentItems = Array.from(
            thesis.querySelectorAll<HTMLElement>(".pulse-thesis-content > *"),
          );
          const inputNodes = Array.from(
            thesis.querySelectorAll<HTMLElement>(
              ".pulse-fusion-node-semantic, .pulse-fusion-node-keyword",
            ),
          );
          const flowPaths = Array.from(
            thesis.querySelectorAll<SVGPathElement>(".pulse-fusion-flow"),
          );
          const fusionCore = thesis.querySelector<HTMLElement>(
            ".pulse-fusion-core",
          );
          const outputNode = thesis.querySelector<HTMLElement>(
            ".pulse-fusion-node-output",
          );
          const thesisTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: thesis,
              start: "top 72%",
              toggleActions: "play none none none",
            },
            defaults: { ease: "power3.out" },
          });

          thesisTimeline.fromTo(
            contentItems,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.06 },
          );

          thesisTimeline.fromTo(
            inputNodes,
            { autoAlpha: 0, x: -14 },
            { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.06 },
            0.08,
          );

          thesisTimeline.fromTo(
            flowPaths,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 0.62,
              stagger: 0.07,
              ease: "power2.inOut",
            },
            0.18,
          );

          if (fusionCore) {
            thesisTimeline.fromTo(
              fusionCore,
              { autoAlpha: 0, scale: 0.92 },
              { autoAlpha: 1, scale: 1, duration: 0.46 },
              0.34,
            );
          }

          if (outputNode) {
            thesisTimeline.fromTo(
              outputNode,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.4 },
              0.52,
            );
          }

          thesisTimeline.set(
            [...contentItems, ...inputNodes, fusionCore, outputNode].filter(
              Boolean,
            ) as HTMLElement[],
            { clearProps: "transform,opacity,visibility" },
          );
        }

        const securityStory = root.querySelector<HTMLElement>(
          "[data-motion='security-story']",
        );
        if (securityStory) {
          const supportingCopy = Array.from(
            securityStory.querySelectorAll<HTMLElement>(
              ".security-eyebrow, .pulse-security-summary, .pulse-security-boundary-note",
            ),
          );
          const vault = securityStory.querySelector<HTMLElement>(
            ".security-vault",
          );
          const principles = Array.from(
            securityStory.querySelectorAll<HTMLElement>(
              ".pulse-security-architecture article",
            ),
          );
          const securityTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: securityStory,
              start: "top 72%",
              toggleActions: "play none none none",
            },
            defaults: { ease: "power3.out" },
          });

          securityTimeline.fromTo(
            supportingCopy,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.055 },
          );

          if (vault) {
            securityTimeline.fromTo(
              vault,
              { autoAlpha: 0, rotation: -5, scale: 0.96 },
              { autoAlpha: 1, rotation: 0, scale: 1, duration: 0.64 },
              0.08,
            );
          }

          securityTimeline.fromTo(
            principles,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.44,
              stagger: 0.055,
            },
            0.28,
          );

          securityTimeline.set(
            [...supportingCopy, vault, ...principles].filter(
              Boolean,
            ) as HTMLElement[],
            { clearProps: "transform,opacity,visibility" },
          );
        }
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const motionTargets = Array.from(
          root.querySelectorAll<HTMLElement>("[data-motion]"),
        );
        if (motionTargets.length) {
          gsap.set(motionTargets, { clearProps: "all" });
        }
      });

      return () => {
        media.revert();
        document.documentElement.classList.remove("gsap-motion");
      };
    },
    { dependencies: [scope], revertOnUpdate: true },
  );

  return null;
}
