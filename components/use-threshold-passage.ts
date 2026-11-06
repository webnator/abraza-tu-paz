'use client';

import { useLayoutEffect, type RefObject } from 'react';

// The garden stays mounted while the doorway passes the camera. Capture the
// actual pointer/camera pose, rather than snapping it to a neutral first frame.
const planes = {
  world: '.scene-world',
  garden: '.garden-backdrop',
  foreground: '.garden-foreground',
  left: '.garden-frond--left',
  right: '.garden-frond--right',
  gate: '.depth-layer--threshold',
  flowers: '.entrance-foreground',
} as const;
type Plane = keyof typeof planes;
type Pose = { transform: string; opacity: string; filter: string };
export type ThresholdView = Partial<Record<Plane, Pose>>;
export const thresholdDuration = 2100;

export function captureThresholdView(world: HTMLElement): ThresholdView {
  const scene = world.parentElement!;
  return Object.fromEntries(
    Object.entries(planes).flatMap(([key, selector]) => {
      const element = scene.querySelector(selector);
      if (!element) return [];
      const { transform, opacity, filter } = getComputedStyle(element);
      return [[key, { transform, opacity, filter }]];
    }),
  );
}

export function useThresholdPassage({
  world,
  active,
  entering,
  start,
  finish,
  reducedMotion,
}: {
  world: RefObject<HTMLDivElement | null>;
  active: boolean;
  entering: boolean;
  start: RefObject<ThresholdView | null>;
  finish: () => void;
  reducedMotion: boolean;
}) {
  useLayoutEffect(() => {
    if (!active || !world.current || !start.current) return;
    if (reducedMotion) {
      finish();
      return;
    }
    const scene = world.current.parentElement!;
    const animations: Animation[] = [];
    const options: KeyframeAnimationOptions = {
      duration: thresholdDuration,
      easing: 'cubic-bezier(0.42, 0, 0.22, 1)',
      fill: 'both',
    };
    const animate = (element: Element, frames: Keyframe[]) => {
      const animation = element.animate(frames, options);
      animations.push(animation);
      return animation;
    };
    let clock: Animation | undefined;
    for (const [key, selector] of Object.entries(planes)) {
      const element = scene.querySelector<HTMLElement>(selector);
      if (!element) continue;
      const from = start.current[key as Plane];
      const style = getComputedStyle(element);
      const to = {
        transform: style.transform,
        opacity: style.opacity,
        filter: style.filter,
      };
      if (key === 'gate' || key === 'flowers') {
        const far = {
          transform: `translate3d(0, 0, 0) scale(${key === 'gate' ? 6 : 3.6})`,
          opacity: '0',
          filter: 'none',
        };
        const near = entering ? from! : to;
        // Remain solid while passing the camera. Only the final offscreen
        // remnants fade; there is never a crossfade between two garden views.
        const frames: Keyframe[] = [
          { ...near, offset: 0 },
          {
            transform: far.transform,
            opacity: '1',
            filter: 'none',
            offset: 0.92,
          },
          { ...far, offset: 1 },
        ];
        animate(
          element,
          entering
            ? frames
            : frames
                .toReversed()
                .map((frame) => ({ ...frame, offset: 1 - frame.offset! })),
        );
      } else if (key === 'left' || key === 'right') {
        const hidden = entering ? from! : to;
        const visible = entering ? to : from!;
        const frames: Keyframe[] = [
          { ...hidden, offset: 0 },
          { ...hidden, offset: 0.24 },
          { ...visible, offset: 1 },
        ];
        animate(
          element,
          entering
            ? frames
            : frames
                .toReversed()
                .map((frame) => ({ ...frame, offset: 1 - frame.offset! })),
        );
      } else if (from) {
        const animation = animate(element, [from, to]);
        if (key === 'world') clock = animation;
      }
    }
    // Completion follows the camera, including background-tab throttling.
    // Do not leave a timer-sized pause before changing the interaction state.
    if (clock) clock.onfinish = finish;
    else finish();
    return () => {
      animations.forEach((animation) => {
        animation.onfinish = null;
        animation.cancel();
      });
    };
  }, [active, entering, finish, reducedMotion, start, world]);
}
