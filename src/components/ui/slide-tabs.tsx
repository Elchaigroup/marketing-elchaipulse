import {
  type PointerEvent as ReactPointerEvent,
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";

type TabPosition = {
  left: number;
  width: number;
  opacity: number;
};

const tabs = [
  { label: "Overview", compactLabel: "Home", href: "#top" },
  { label: "Why Pulse", compactLabel: "Why", href: "#product" },
  { label: "Product", compactLabel: "Product", href: "#demo" },
  { label: "How It Works", compactLabel: "How", href: "#thesis" },
  { label: "Contact", compactLabel: "Contact", href: "#briefing" },
] as const;

export function SlideTabs() {
  const [selected, setSelected] = useState(0);
  const [highlighted, setHighlighted] = useState(0);
  const [position, setPosition] = useState<TabPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const tabsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const pointerInside = useRef(false);
  const hoverIntentTimer = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const cancelHoverIntent = useCallback(() => {
    if (hoverIntentTimer.current === null) return;
    window.clearTimeout(hoverIntentTimer.current);
    hoverIntentTimer.current = null;
  }, []);

  const measureTab = useCallback((index: number) => {
    const tab = tabsRef.current[index];
    if (!tab) return;

    setPosition({
      left: tab.parentElement?.offsetLeft ?? tab.offsetLeft,
      width: tab.offsetWidth,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if (!pointerInside.current) {
      setHighlighted(selected);
      measureTab(selected);
    }
  }, [measureTab, selected]);

  useEffect(() => {
    const handleResize = () => measureTab(highlighted);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [highlighted, measureTab]);

  useEffect(() => () => cancelHoverIntent(), [cancelHoverIntent]);

  useEffect(() => {
    const sections = tabs
      .map(({ href }, index) => ({
        element: document.querySelector<HTMLElement>(href),
        index,
      }))
      .filter(
        (entry): entry is { element: HTMLElement; index: number } =>
          entry.element !== null,
      );
    let frameId = 0;

    const updateSelectedTab = () => {
      frameId = 0;
      const activationLine = Math.min(window.innerHeight * 0.22, 180);
      let nextIndex = 0;

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top > activationLine) break;
        nextIndex = section.index;
      }

      setSelected((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateSelectedTab);
    };

    updateSelectedTab();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const setTabRef = (index: number): RefCallback<HTMLAnchorElement> =>
    (element) => {
      tabsRef.current[index] = element;
    };

  const previewTab = (
    index: number,
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType === "touch") return;
    pointerInside.current = true;
    cancelHoverIntent();
    hoverIntentTimer.current = window.setTimeout(() => {
      setHighlighted(index);
      measureTab(index);
      hoverIntentTimer.current = null;
    }, 140);
  };

  const resetToSelected = () => {
    cancelHoverIntent();
    pointerInside.current = false;
    setHighlighted(selected);
    measureTab(selected);
  };

  return (
    <ul
      className="pulse-slide-tabs"
      onPointerLeave={resetToSelected}
      aria-label="Page sections"
    >
      {tabs.map((tab, index) => (
        <li key={tab.label}>
          <a
            ref={setTabRef(index)}
            className={`pulse-slide-tab focus-ring${
              highlighted === index ? " is-highlighted" : ""
            }`}
            href={tab.href}
            aria-label={tab.label}
            aria-current={selected === index ? "location" : undefined}
            onClick={() => {
              cancelHoverIntent();
              setSelected(index);
              setHighlighted(index);
            }}
            onFocus={() => {
              cancelHoverIntent();
              setHighlighted(index);
              measureTab(index);
            }}
            onPointerEnter={(event) => previewTab(index, event)}
          >
            <span className="pulse-tab-label-full">{tab.label}</span>
            <span className="pulse-tab-label-compact" aria-hidden="true">
              {tab.compactLabel}
            </span>
          </a>
        </li>
      ))}

      <motion.span
        className="pulse-slide-tabs-cursor"
        aria-hidden="true"
        animate={position}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
        }
      />
    </ul>
  );
}
