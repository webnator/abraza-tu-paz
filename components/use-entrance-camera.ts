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
      const values = {
        x: `${(-x * Math.min(innerWidth * 0.065, 130) + Math.sin(t * 0.32) * 2.2 + Math.sin(t * 0.73) * 0.4).toFixed(3)}px`,
        y: `${(-y * Math.min(innerHeight * 0.07, 90) + Math.sin(t * 0.42) * 1.3 + Math.sin(t * 0.83) * 0.7).toFixed(3)}px`,
        rx: `${(y * 2.8 + Math.sin(t * 0.25) * 0.07).toFixed(4)}deg`,
        ry: `${(-x * 4.4 + Math.sin(t * 0.21) * 0.1).toFixed(4)}deg`,
        roll: `${(Math.sin(t * 0.28) * 0.055).toFixed(4)}deg`,
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
