import { useEffect, useRef } from "react";

const cipherCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
    const section = field?.parentElement;

    if (!field || !section) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastCipherUpdate = 0;

    const refreshCipher = (timestamp: number) => {
      if (!cipherRef.current || timestamp - lastCipherUpdate < 72) return;

      cipherRef.current.textContent = generateCipher(24000);
      lastCipherUpdate = timestamp;
    };

    const hideField = () => {
      field.dataset.active = "false";
    };

    const updateField = (timestamp: number) => {
      const bounds = section.getBoundingClientRect();
      field.style.setProperty("--security-pointer-x", `${pointerX - bounds.left}px`);
      field.style.setProperty("--security-pointer-y", `${pointerY - bounds.top}px`);
      refreshCipher(timestamp);
      field.dataset.active = "true";
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) frame = window.requestAnimationFrame(updateField);
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", hideField);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", hideField);
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
        {generateCipher(24000)}
      </p>
    </div>
  );
}
