'use client';

import { useRef, useState } from 'react';

export default function Carousel({ images, alt }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  // Mirrors `index` so back-to-back arrow clicks read the position already
  // scrolled to rather than the one from the last render.
  const indexRef = useRef(0);

  function setActive(next) {
    indexRef.current = next;
    setIndex(next);
  }

  // Swipes are only observable through the scroll event, so it keeps the
  // counter in sync — the arrows set the index themselves rather than waiting
  // for the scroll to be reported back.
  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== indexRef.current) setActive(next);
  }

  function go(delta) {
    const el = trackRef.current;
    if (!el) return;
    const target = Math.min(Math.max(indexRef.current + delta, 0), images.length - 1);
    setActive(target);
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className="carousel-frame">
      <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
        {images.map((src, i) => (
          <img key={src} src={src} alt={i === 0 ? alt : ''} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
      </div>
      <div className="carousel-nav">
        <span className="carousel-count">
          {index + 1} / {images.length}
        </span>
        <div className="carousel-arrows">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="이전 사진">
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === images.length - 1}
            aria-label="다음 사진"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
