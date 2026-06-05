import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PremiumCarouselProps {
  children: React.ReactNode[];
}

export default function PremiumCarousel({ children }: PremiumCarouselProps) {
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
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Viewport container */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {children.map((child, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <div
                key={idx}
                className="w-[82%] sm:w-[75%] md:w-[65%] shrink-0 px-3 transition-all duration-500 ease-out"
                style={{
                  transform: isActive ? 'scale(1.02)' : 'scale(0.92)',
                  opacity: isActive ? 1 : 0.65,
                }}
              >
                <div 
                  className={`w-full h-full rounded-[32px] transition-all duration-500 overflow-hidden ${
                    isActive 
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
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === selectedIndex 
                ? 'w-6 bg-[#0A1A14]' 
                : 'w-2 bg-[#ECECE6] hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
