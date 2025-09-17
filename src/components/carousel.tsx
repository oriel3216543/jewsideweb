"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
}

export function Carousel({
  children,
  className,
  itemClassName,
  loop = true,
  autoPlay = false,
  interval = 5000,
  showControls = true,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const itemsRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev === totalItems - 1 ? (loop ? 0 : prev) : prev + 1));
  }, [totalItems, loop]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? (loop ? totalItems - 1 : 0) : prev - 1));
  }, [totalItems, loop]);

  // Handle autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(next, interval);
    return () => clearInterval(intervalId);
  }, [current, isAutoPlaying, interval, next]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={itemsRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "min-w-full flex-shrink-0",
              itemClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <AnimatePresence>
            {current > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={prev}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(current < totalItems - 1 || loop) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 right-4 -translate-y-1/2"
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={next}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 w-6 rounded-full transition-colors",
              index === current ? "bg-primary" : "bg-primary/30"
            )}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
