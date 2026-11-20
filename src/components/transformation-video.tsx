import { useEffect, useRef } from "react";
import { TRANSFORMATION_VIDEO } from "@/lib/transformation-video";

export function TransformationVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not reliably set the muted attribute itself; autoplay requires it.
    video.muted = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;

    let userPaused = false;
    let pausedByScroll = false;
    const onPause = () => {
      if (!pausedByScroll) userPaused = true;
      pausedByScroll = false;
    };
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (!userPaused && video.paused) {
            // If the browser refuses (e.g. data saver), the poster and play button remain.
            video.play().catch(() => {});
          }
        } else if (!video.paused) {
          pausedByScroll = true;
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`h-full w-full bg-foreground object-contain ${className}`}
      controls
      muted
      loop
      playsInline
      preload="none"
      poster={TRANSFORMATION_VIDEO.poster}
      width={TRANSFORMATION_VIDEO.width}
      height={TRANSFORMATION_VIDEO.height}
      aria-label={TRANSFORMATION_VIDEO.description}
    >
      <source src={TRANSFORMATION_VIDEO.src} type="video/mp4" />
      Your browser can&rsquo;t play this video.
    </video>
  );
}
