// Cozy overlays above the frames: vignette, film grain and slowly rising embers.

const EMBER_COUNT = 26;

// Deterministic pseudo-random so server and client render the same embers;
// rounded so float noise between engines can't cause a hydration mismatch.
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

const fixed = (n: number) => n.toFixed(2);

const embers = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: `${fixed(rand(i) * 100)}%`,
  size: `${fixed(2 + rand(i + 50) * 3)}px`,
  duration: fixed(9 + rand(i + 100) * 10),
  delay: fixed(-rand(i + 150) * 19),
  drift: `${fixed((rand(i + 200) - 0.5) * 120)}px`,
  opacity: fixed(0.4 + rand(i + 250) * 0.5),
}));

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 45%, transparent 45%, rgb(8 5 3 / 0.75) 100%)" }}
      />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full"
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              backgroundImage: "radial-gradient(circle, #ffd59a, #ff8a3d 60%, transparent 70%)",
              boxShadow: "0 0 8px 2px rgb(255 138 61 / 0.55)",
              animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
              "--drift": e.drift,
              "--ember-opacity": e.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
