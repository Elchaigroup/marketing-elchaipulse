import { useEffect, useRef } from "react";

const cipherCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/* Initial server/first-paint fill. The effect measures the section and grows
   this to whatever actually covers the field. */
const INITIAL_CIPHER_LENGTH = 24000;

/* Ceiling so an unusually tall or wide viewport cannot make each refresh
   arbitrarily expensive. */
const MAX_CIPHER_LENGTH = 90000;

function generateCipher(length: number) {
  let result = "";

  for (let index = 0; index < length; index += 1) {
    result += cipherCharacters.charAt(
      Math.floor(Math.random() * cipherCharacters.length),
    );
  }

  return result;
}

export function SecurityHoverField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const cipherRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const cipher = cipherRef.current;
    const section = field?.parentElement;

    if (!field || !cipher || !section) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerKnown = false;
    let lastCipherUpdate = 0;
    let cipherLength = INITIAL_CIPHER_LENGTH;

    /* A fixed character count covers less and less of the section as the
       viewport widens (more characters per line means fewer lines), which left
       the lower part of the section with no characters to reveal. Derive the
       count from the rendered character metrics instead. */
    const measureCipherLength = () => {
      const bounds = field.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return cipherLength;

      const styles = window.getComputedStyle(cipher);
      const fontSize = parseFloat(styles.fontSize) || 10;
      const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.02;
      const letterSpacing = parseFloat(styles.letterSpacing) || 0;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      let characterWidth = fontSize * 0.6;

      if (context) {
        context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
        /* The approved Inter face is proportional. Measuring a single wide
           glyph such as M underestimates how many random characters fit on a
           line and can leave the bottom of the section without cipher text. */
        characterWidth =
          context.measureText(cipherCharacters).width / cipherCharacters.length ||
          characterWidth;
      }

      characterWidth += letterSpacing;
      if (characterWidth <= 0) return cipherLength;

      const perLine = Math.ceil(bounds.width / characterWidth) + 2;
      const lines = Math.ceil(bounds.height / lineHeight) + 2;

      /* Headroom absorbs sub-pixel rounding, random-glyph variance, and the
         ragged final line without relying on a viewport-specific height. */
      return Math.min(
        MAX_CIPHER_LENGTH,
        Math.ceil(perLine * lines * 1.2),
      );
    };

    const resizeCipher = () => {
      const next = measureCipherLength();
      if (next === cipherLength) return;

      cipherLength = next;
      cipher.textContent = generateCipher(cipherLength);
    };

    const refreshCipher = (timestamp: number) => {
      if (timestamp - lastCipherUpdate < 72) return;

      cipher.textContent = generateCipher(cipherLength);
      lastCipherUpdate = timestamp;
    };

    const updateField = (timestamp: number) => {
      frame = 0;

      const bounds = section.getBoundingClientRect();

      /* Bounds-test every frame rather than relying on pointerleave: while the
         page scrolls the pointer never moves, so pointerleave never fires even
         though the section slides out from under it. */
      const isInside =
        pointerKnown &&
        pointerX >= bounds.left &&
        pointerX <= bounds.right &&
        pointerY >= bounds.top &&
        pointerY <= bounds.bottom;

      if (!isInside) {
        field.dataset.active = "false";
        return;
      }

      field.style.setProperty("--security-pointer-x", `${pointerX - bounds.left}px`);
      field.style.setProperty("--security-pointer-y", `${pointerY - bounds.top}px`);
      refreshCipher(timestamp);
      field.dataset.active = "true";
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateField);
    };

    /* Tracked on the window, not the section, so the pointer position is known
       even when the section scrolls up to meet a stationary cursor. */
    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerKnown = true;
      scheduleUpdate();
    };

    const handlePointerLeaveWindow = () => {
      pointerKnown = false;
      scheduleUpdate();
    };

    const handleResize = () => {
      resizeCipher();
      scheduleUpdate();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(section);
    resizeObserver.observe(field);

    void document.fonts.ready.then(handleResize);
    resizeCipher();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("pointerleave", handlePointerLeaveWindow);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerleave", handlePointerLeaveWindow);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className="security-hover-field"
      data-active="false"
      aria-hidden="true"
    >
      <div className="security-hover-field-light" />
      <p ref={cipherRef} className="security-hover-field-cipher">
        {generateCipher(INITIAL_CIPHER_LENGTH)}
      </p>
    </div>
  );
}
