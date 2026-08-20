import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type OpticallyAlignedTextProps = {
  text: string;
  className?: string;
};

const LINE_TOLERANCE_PX = 1;

function alignWrappedLines(container: HTMLElement) {
  const words = Array.from(
    container.querySelectorAll<HTMLElement>("[data-optical-word]"),
  );

  if (!words.length) return;

  words.forEach((word) => {
    word.style.removeProperty("--optical-line-shift");
  });

  const lines: Array<{ top: number; words: HTMLElement[] }> = [];

  words.forEach((word) => {
    const top = word.getBoundingClientRect().top;
    const line = lines.find(
      (candidate) => Math.abs(candidate.top - top) <= LINE_TOLERANCE_PX,
    );

    if (line) {
      line.words.push(word);
    } else {
      lines.push({ top, words: [word] });
    }
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  lines.forEach(({ words: lineWords }) => {
    const firstWord = lineWords[0];
    const firstCharacter = Array.from(firstWord.dataset.opticalWord ?? "")[0];
    if (!firstCharacter) return;

    const styles = window.getComputedStyle(firstWord);
    context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    context.fontKerning = "normal";

    const metrics = context.measureText(firstCharacter);
    const fontSize = Number.parseFloat(styles.fontSize) || 16;
    const maximumShift = fontSize * 0.08;
    const measuredShift = Number.isFinite(metrics.actualBoundingBoxLeft)
      ? metrics.actualBoundingBoxLeft
      : 0;
    const shift = Math.max(-maximumShift, Math.min(maximumShift, measuredShift));

    lineWords.forEach((word) => {
      word.style.setProperty("--optical-line-shift", `${shift}px`);
    });
  });
}

export function useOpticalLineAlignment<T extends HTMLElement>(
  dependency: string,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    let frame = 0;
    let cancelled = false;

    const scheduleAlignment = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!cancelled) alignWrappedLines(container);
      });
    };

    const observer = new ResizeObserver(scheduleAlignment);
    observer.observe(container);
    if (container.parentElement) observer.observe(container.parentElement);

    void document.fonts.ready.then(scheduleAlignment);
    window.addEventListener("resize", scheduleAlignment, { passive: true });
    scheduleAlignment();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleAlignment);
    };
  }, [dependency]);

  return ref;
}

export function OpticallyAlignedText({
  text,
  className,
}: OpticallyAlignedTextProps) {
  const ref = useOpticalLineAlignment<HTMLSpanElement>(text);

  return (
    <span ref={ref} className={cn("optically-aligned-text", className)}>
      {text.split(/(\s+)/).filter(Boolean).map((token, index) =>
        /^\s+$/.test(token) ? (
          <span key={`space-${index}`}>{token}</span>
        ) : (
          <span
            className="optically-aligned-word"
            data-optical-word={token}
            key={`${token}-${index}`}
          >
            {token}
          </span>
        ),
      )}
    </span>
  );
}

export default OpticallyAlignedText;
