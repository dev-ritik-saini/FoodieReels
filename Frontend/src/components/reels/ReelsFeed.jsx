import React, { useEffect, useRef } from "react";

const ReelsFeed = ({ items = [] }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const vids = videoRefs.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            // Pause others
            vids.forEach((v) => {
              if (v !== video && !v.paused) v.pause();
            });
            // Play current
            if (video.paused) {
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {
                  // ignore autoplay errors
                });
              }
            }
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 1] }
    );

    vids.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className="reels-container">
      {items.map((item, idx) => (
        <section className="reel" key={item.id || idx}>
          <video
            className="reel-video"
            src={item.src}
            playsInline
            muted
            loop
            ref={(el) => (videoRefs.current[idx] = el)}
          />
          <div className="reel-overlay">
            <p className="reel-desc" title={item.description}>
              {item.description}
            </p>
            <a
              className="reel-btn"
              href={item.storeUrl || "#"}
              target="_blank"
              rel="noreferrer"
            >
              Visit Store
            </a>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReelsFeed;
