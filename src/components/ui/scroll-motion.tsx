import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cleanUrlFrame = 0;

    const removeHashFromUrl = () => {
      if (!window.location.hash) return;
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    };

    const handleSectionLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      removeHashFromUrl();
    };

    document.addEventListener("click", handleSectionLink);
    window.addEventListener("hashchange", removeHashFromUrl);

    if (window.location.hash) {
      cleanUrlFrame = window.requestAnimationFrame(removeHashFromUrl);
    }

    return () => {
      document.removeEventListener("click", handleSectionLink);
      window.removeEventListener("hashchange", removeHashFromUrl);
      if (cleanUrlFrame) window.cancelAnimationFrame(cleanUrlFrame);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const ambientElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".pulse-orb-stage, .pulse-voice-object",
      ),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      if (!prefersReducedMotion) {
        ambientElements.forEach((element) => element.classList.add("is-in-view"));
      }
      document.documentElement.style.setProperty("--scroll-progress", "1");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasSkippedByFastScroll = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !wasSkippedByFastScroll) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    const ambientObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.05 },
    );

    ambientElements.forEach((element) => ambientObserver.observe(element));

    let frameId = 0;
    const updateProgress = () => {
      frameId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        progress.toFixed(4),
      );
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      ambientObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pulse-scroll-meter" aria-hidden="true">
      <span />
    </div>
  );
}
