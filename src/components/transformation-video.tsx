import { IMG } from "@/lib/images";

/**
 * Client-provided bathroom cleaning video with on-screen "Before" and "After" footage.
 * Source is portrait (180x320 after rotation), H.264 + AAC, about 22 seconds and 0.75 MB.
 *
 * Native player: user-initiated playback only (no autoplay), `preload="none"` so the file is
 * not downloaded until someone presses play (only the small poster loads up front), and
 * `playsInline` so iPhones play it in place. Put it inside a box with a fixed aspect ratio so
 * the page never shifts while it loads.
 */
export const TRANSFORMATION_VIDEO = {
  src: "/videos/cleaning-transformation.mp4",
  poster: IMG.clientTransformationPoster,
  width: 180,
  height: 320,
  label: "Cleaning Transformation — Before & After",
  description: "Video of a bathroom cleaning, showing the space before and after.",
};

export function TransformationVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={`h-full w-full bg-foreground object-contain ${className}`}
      controls
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
