import frames from "./frames.json";
import { asset } from "@/lib/asset";

// Dark wash over the mask-wall frame so content stays readable; shared with the home page's
// post-sequence dim layer so every page has the same backdrop.
export const BACKDROP_DIM =
  "radial-gradient(ellipse at 50% 35%, rgb(12 9 7 / 0.55), rgb(12 9 7 / 0.85) 70%), linear-gradient(rgb(12 9 7 / 0.35), rgb(12 9 7 / 0.35))";

const LAST_FRAME = asset(`/frames/frame-${String(frames.count).padStart(3, "0")}.webp`);

/** Fixed background for pages without the scroll sequence: the last walk-in frame, dimmed. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${LAST_FRAME})` }} />
      <div className="absolute inset-0" style={{ background: BACKDROP_DIM }} />
    </div>
  );
}
