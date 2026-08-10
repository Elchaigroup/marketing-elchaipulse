import { useEffect, useRef, useState } from "react";

type MotionAwareVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  preload?: "none" | "metadata" | "auto";
};

export function MotionAwareVideo({
  src,
  className,
  poster,
  preload = "metadata",
}: MotionAwareVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      if (prefersReducedMotion || !isVisible || document.hidden) {
        video.pause();
        if (prefersReducedMotion) video.currentTime = 0;
        return;
      }

      void video.play().catch(() => {
        // Autoplay can be blocked by user or browser policy; the first frame remains visible.
      });
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);

    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [isVisible, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !prefersReducedMotion) return;

    if (prefersReducedMotion) {
      video.pause();
      video.currentTime = 0;
    }
  }, [prefersReducedMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay={!prefersReducedMotion}
      loop
      muted
      playsInline
      preload={preload}
      aria-hidden="true"
    />
  );
}
