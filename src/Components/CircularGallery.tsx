"use client";

import React, { useRef, useEffect, useState } from "react";
import "./CircularGallery.css";

const cards = [
  {
    image: "/pearson.jpeg",
    title: "Pearson Professional Center",
    description: "Approximately 1.2 km from Hill Street Service Apartment.",
  },
  {
    image: "/Rainbow.jpg",
    title: "Rainbow Children’s Hospital",
    description: "Approximately 2.1 km from Hill Street Service Apartment.",
  },
  {
    image: "/LVprasad.jpg",
    title: "LV Prasad Eye Institute",
    description: "Approximately 1.3 km from Hill Street Service Apartment.",
  },
  {
    image: "/AIG.jpg",
    title: "AIG Hospitals, Banjara Hills",
    description: "Approximately 2.9 km from Hill Street Service Apartment.",
  },
  {
    image: "/care.png",
    title: "Care Hospital, Banjara Hills",
    description: "Approximately 3.8 km from Hill Street Service Apartment.",
  },
  {
    image: "/necklace.jpg",
    title: "Necklace Road",
    description: "Approximately 5 km from Hill Street Service Apartment.",
  },
  {
    image: "/Birla.png",
    title: "Birla Temple",
    description: "Approximately 6.2 km from Hill Street Service Apartment.",
  },
  {
    image: "/airport.jpg",
    title: "Begumpet Railway Station",
    description: "Approximately 4.6 km from Hill Street Service Apartment.",
  },
  {
    image: "/habitat.jpg",
    title: "Habitat Cafe",
    description: "Approximately 2.3 km from Hill Street Service Apartment.",
  },
    {
    image: "/metro.jpg",
    title: "Metro station road number 5 Jubilee hills",
    description: "Approximately 1.6 km from Hill Street Service Apartment.",
  },
     {
    image: "/punjagutta.jpg",
    title: "Metro Station Punjagutta",
    description: "Approximately 2.1 km from Hill Street Service Apartment.",
  },
];

export default function AutoScrollGallery() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const [isInteracting, setIsInteracting] = useState(false);
  const touchStartX = useRef(0);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    if (isInteracting) return;

    autoScrollRef.current = setInterval(() => {
      wrapperRef.current?.scrollBy({ left: 1, behavior: "smooth" });
    }, -20);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isInteracting]);

  /* ---------- BUTTON CONTROLS ---------- */
  const scrollLeft = () => {
    setIsInteracting(true);
    wrapperRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    setIsInteracting(true);
    wrapperRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  /* ---------- TOUCH ---------- */
  const onTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    wrapperRef.current?.scrollBy({ left: diff });
    touchStartX.current = currentX;
  };

  const onInteractionEnd = () => {
    setTimeout(() => setIsInteracting(false), 1500);
  };
  
    return (
    <div className="gallery-container">
      <button className="scroll-btn left" onClick={scrollLeft}>‹</button>

      <div
        className="gallery-wrapper"
        ref={wrapperRef}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={onInteractionEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onInteractionEnd}
      >
        <div className="gallery-track">
          {cards.concat(cards).map((card, index) => (
            <div className="gallery-card" key={index}>
              <img src={card.image} alt={card.title} />
              <div className="card-text">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="scroll-btn right" onClick={scrollRight}>›</button>
    </div>
  );
}
