import { IMG } from "./images";

/**
 * Client-provided bathroom cleaning video with on-screen "Before" and "After" footage.
 * Portrait 360x640 (9:16), H.264 + AAC, about 22 seconds and 0.9 MB.
 *
 * Plays automatically (muted, looping) once it is scrolled into view, and pauses when it
 * leaves the screen. Browsers only allow autoplay when muted, so visitors turn the sound on
 * with the player controls. Autoplay is skipped for visitors who prefer reduced motion
 * (they get the poster and the play button), and if a visitor pauses it themselves it stays
 * paused. `preload="none"` means nothing is downloaded until the video is in view; only the
 * small poster loads up front. Put it inside a box with a fixed aspect ratio so the page
 * never shifts while it loads.
 */
export const TRANSFORMATION_VIDEO = {
  src: "/videos/cleaning-transformation.mp4",
  poster: IMG.clientTransformationPoster,
  width: 360,
  height: 640,
  label: "Cleaning Transformation — Before & After",
  description: "Video of a bathroom cleaning, showing the space before and after.",
};
