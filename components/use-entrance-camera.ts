'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';

// One shared camera for the entrance world, including its physical sign and hit areas.
// The existing depth layers keep their own smaller pointer parallax underneath it.
export function useEntranceCamera({
  stage,
  enabled,
  paused,
  reducedMotion,
}: {
  stage: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  paused: boolean;
  reducedMotion: boolean;
}) {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      target.current = current.current = { x: 0, y: 0 };
      elapsed.current = 0;
      ['x', 'y', 'rx', 'ry', 'roll'].forEach((key) =>
        stage.current?.style.removeProperty(`--camera-${key}`),
      );
      return;
    }
    if (paused) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      const delta = previous ? Math.min(now - previous, 40) : 16;
      previous = now;
      elapsed.current += delta / 1000;
      const t = elapsed.current;
      const ease = 1 - Math.exp(-delta / 140);
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      const { x, y } = current.current;
      // Keep the approved pointer gesture; give the stationary camera a visible,
      // slow handheld drift rather than a nearly imperceptible sub-pixel change.
      const idleScale = Math.max(0.7, Math.min(1, innerWidth / 900));
      const values = {
        x: `${(-x * Math.min(innerWidth * 0.065, 130) + (Math.sin(t * 0.7) * 6.5 + Math.sin(t * 0.31) * 2) * idleScale).toFixed(3)}px`,
        y: `${(-y * Math.min(innerHeight * 0.07, 90) + (Math.sin(t * 0.9) * 3 + Math.sin(t * 0.39) * 1.6) * idleScale).toFixed(3)}px`,
        rx: `${(y * 2.8 + Math.sin(t * 0.55) * 0.12 * idleScale).toFixed(4)}deg`,
        ry: `${(-x * 4.4 + Math.sin(t * 0.42) * 0.2 * idleScale).toFixed(4)}deg`,
        roll: `${(Math.sin(t * 0.35) * 0.075 * idleScale).toFixed(4)}deg`,
      };
      for (const [key, value] of Object.entries(values))
        stage.current?.style.setProperty(`--camera-${key}`, value);
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (document.visibilityState === 'visible')
        frame = requestAnimationFrame(tick);
    };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [enabled, paused, reducedMotion, stage]);

  const move = useCallback((x: number, y: number) => {
    target.current = {
      x: Math.max(-0.5, Math.min(0.5, x)),
      y: Math.max(-0.5, Math.min(0.5, y)),
    };
  }, []);
  const reset = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);
  return { move, reset };
}
