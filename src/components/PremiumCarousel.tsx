import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';

interface PremiumCarouselProps {
  children: React.ReactNode[];
}

export default function PremiumCarousel({ children }: PremiumCarouselProps) {
  const uniqueCount = children.length;

  // Duplicate slides if they are too few to support smooth infinite loop in Embla 8
  let multipliedChildren = [...children];
  if (uniqueCount > 0 && uniqueCount < 8) {
    const repeatCount = Math.ceil(8 / uniqueCount);
    multipliedChildren = [];
    for (let i = 0; i < repeatCount; i++) {
      multipliedChildren.push(...children);
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    
    const onSelect = () => {
      // Map index back to original index using modulo
      const currentIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(currentIndex);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;

    let autoplayId: any = null;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayId = setInterval(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, 3500);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('settle', startAutoplay);

    startAutoplay();

    return () => stopAutoplay();
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  if (uniqueCount === 0) return null;

  // Show unique dots matching original children size
  const dotsCount = uniqueCount;
  const activeDotIndex = selectedIndex % uniqueCount;

  return (
    <div className="relative w-full overflow-hidden py-6 animate-fade-in">
      {/* Viewport container */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {multipliedChildren.map((child, idx) => {
            const isSlideActive = (idx % uniqueCount) === activeDotIndex;
            return (
              <div
                key={idx}
                className="w-[82%] sm:w-[75%] md:w-[65%] shrink-0 px-3 transition-all duration-500 ease-out"
                style={{
                  transform: isSlideActive ? 'scale(1.02)' : 'scale(0.92)',
                  opacity: isSlideActive ? 1 : 0.65,
                }}
              >
                <div 
                  className={`w-full h-full rounded-[30px] transition-all duration-500 overflow-hidden ${
                    isSlideActive 
                      ? 'shadow-[0_16px_40px_rgba(200,162,74,0.18)] border-[#C8A24A]/40 ring-1 ring-[#C8A24A]/20' 
                      : 'shadow-md border-transparent pointer-events-none'
                  }`}
                >
                  {child}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Slide Navigation Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {Array.from({ length: dotsCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeDotIndex 
                ? 'w-6 bg-[#C8A24A]' 
                : 'w-2 bg-[#89A296]/35 hover:bg-[#89A296]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
