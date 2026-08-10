import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
};

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+/<>{}[]";

function randomCharacter(charset: string) {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

function scramble(text: string, charset: string, revealCount: number) {
  return text
    .split("")
    .map((character, index) => {
      if (index < revealCount || character === " ") return character;
      return randomCharacter(charset);
    })
    .join("");
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
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState(() => ({
    display: scramble(text, charset, 0),
    revealCount: 0,
  }));

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
    <span ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden="true">
        {frame.display.split("").map((character, index) => (
          <span
            key={`${index}-${text[index]}`}
            className={cn(
              index < frame.revealCount
                ? revealedClassName
                : encryptedClassName,
            )}
          >
            {character}
          </span>
        ))}
      </span>
    </span>
  );
}

export default EncryptedText;
