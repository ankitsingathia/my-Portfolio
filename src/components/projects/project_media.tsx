import React, { useEffect, useRef, useState } from 'react';

export interface MediaAsset {
  /** Static still shown before (and instead of) the video. Always loaded. */
  poster: string;
  /** Optional motion sources. When absent, the poster is rendered as a plain image. */
  webm?: string;
  mp4?: string;
}

interface Props {
  media: MediaAsset;
  title: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Renders a project's preview.
 *
 * These previews used to be GIFs (32MB for a single card) which the browser
 * fetched eagerly on page load, before the user had scrolled anywhere near the
 * projects section. They are now short silent videos with `preload="none"`, so
 * nothing but the ~40KB poster is fetched until the card actually scrolls into
 * view. Users who ask for reduced motion only ever get the poster.
 */
const ProjectMedia: React.FC<Props> = ({ media, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(media.webm || media.mp4);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [inView, setInView] = useState(false);

  // Only pull the video bytes down once the card is near the viewport.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasVideo || reducedMotion) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Also resume here, not only in the mount effect below: a video that
          // was paused on scroll-away (or by the browser backgrounding the tab)
          // must start again when it comes back, and `setInView(true)` is a
          // no-op once the flag is already set.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo, reducedMotion]);

  // Once the <source> children are mounted, point the element at them.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !inView) return;
    el.load();
    // Autoplay can still be refused (e.g. data saver); the poster stays up.
    el.play().catch(() => {});
  }, [inView]);

  // The browser pauses media in a backgrounded tab and does not resume it.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasVideo || reducedMotion) return;

    const onVisibility = () => {
      if (document.visibilityState !== 'visible' || !inView) return;
      el.play().catch(() => {});
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [hasVideo, reducedMotion, inView]);

  if (!hasVideo || reducedMotion) {
    return (
      <img
        src={media.poster}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      poster={media.poster}
      preload="none"
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-label={`${title} preview`}
    >
      {inView && media.webm && <source src={media.webm} type="video/webm" />}
      {inView && media.mp4 && <source src={media.mp4} type="video/mp4" />}
    </video>
  );
};

export default ProjectMedia;
