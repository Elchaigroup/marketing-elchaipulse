import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOpticalLineAlignment } from "./optically-aligned-text";

type EncryptedTextProps = {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
};

type TextToken = {
  value: string;
  start: number;
  whitespace: boolean;
};

type AnimationFrame = {
  display: string;
  revealCount: number;
};

const DEFAULT_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

function isEncryptable(character: string) {
  return /[\p{L}\p{N}]/u.test(character);
}

function randomCharacter(charset: string) {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

function scramble(text: string, charset: string, revealCount: number) {
  return text
    .split("")
    .map((character, index) => {
      if (index < revealCount || !isEncryptable(character)) return character;
      return randomCharacter(charset);
    })
    .join("");
}

function tokenize(text: string): TextToken[] {
  let start = 0;

  return text.split(/(\s+)/).filter(Boolean).map((value) => {
    const token = {
      value,
      start,
      whitespace: /^\s+$/.test(value),
    };

    start += value.length;
    return token;
  });
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 36,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 48,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useOpticalLineAlignment<HTMLSpanElement>(text);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState<AnimationFrame>(() =>
    reduceMotion
      ? { display: text, revealCount: text.length }
      : { display: scramble(text, charset, 0), revealCount: 0 },
  );

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setFrame({ display: text, revealCount: text.length });
      return;
    }

    let animationFrame = 0;
    let cancelled = false;
    let lastFlip = 0;
    let lastRevealCount = -1;
    const startedAt = performance.now();

    const update = (now: number) => {
      if (cancelled) return;

      const revealCount = Math.min(
        text.length,
        Math.floor((now - startedAt) / Math.max(1, revealDelayMs)),
      );
      const shouldFlip = now - lastFlip >= Math.max(16, flipDelayMs);

      if (shouldFlip || revealCount !== lastRevealCount) {
        setFrame({
          display: scramble(text, charset, revealCount),
          revealCount,
        });
        lastFlip = now;
        lastRevealCount = revealCount;
      }

      if (revealCount < text.length) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    animationFrame = window.requestAnimationFrame(update);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [charset, flipDelayMs, isInView, reduceMotion, revealDelayMs, text]);

  if (!text) return null;

  return (
    <span
      ref={ref}
      className={cn("encrypted-text", className)}
      aria-label={text}
    >
      <span className="encrypted-text-display" aria-hidden="true">
        {tokenize(text).map(({ value, start, whitespace }, tokenIndex) =>
          whitespace ? (
            <span key={`space-${tokenIndex}`}>{value}</span>
          ) : (
            <span
              className="encrypted-text-word"
              data-optical-word={value}
              key={`${value}-${tokenIndex}`}
            >
              {value.split("").map((character, characterIndex) => {
                const absoluteIndex = start + characterIndex;
                const revealed = absoluteIndex < frame.revealCount;

                return (
                  <span
                    className="encrypted-text-character"
                    key={`${character}-${characterIndex}`}
                  >
                    <span className="encrypted-text-measure">{character}</span>
                    <span
                      className={cn(
                        "encrypted-text-glyph",
                        revealed ? revealedClassName : encryptedClassName,
                      )}
                    >
                      {frame.display[absoluteIndex] ?? character}
                    </span>
                  </span>
                );
              })}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export default EncryptedText;
