import { useMemo, useState } from "react";
import type { PromoSlide } from "./types";

interface PromoBannerProps {
  slides: PromoSlide[];
}

export function PromoBanner({ slides }: PromoBannerProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = useMemo(
    () => slides[activeSlide],
    [slides, activeSlide],
  );

  return (
    <section className="dashboard-promo reveal-1" aria-label="Promotion">
      <div className="dashboard-promo-copy">
        <p className="dashboard-promo-kicker">{currentSlide.title}</p>
        <h1>{currentSlide.subtitle}</h1>
        <button type="button">{currentSlide.ctaLabel}</button>
      </div>

      <div className="dashboard-promo-cards" aria-hidden="true">
        <div className="promo-card front">BOOSTED</div>
        <div className="promo-card middle" />
        <div className="promo-card back" />
      </div>

      <div className="dashboard-promo-controls">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === activeSlide ? "active" : ""}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
