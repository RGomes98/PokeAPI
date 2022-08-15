import { useEffect, useState, useRef } from 'react';

type useInfiniteScrollReturn = {
  isVisible: boolean;
  infiniteScrollRef: React.RefObject<HTMLImageElement>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type useInfiniteScrollOptions = {
  root: null;
  threshold: number;
  rootMargin: string;
};

export const useInfiniteScroll = (options: useInfiniteScrollOptions): useInfiniteScrollReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const OBSERVER_DELAY = 100;
  const infiniteScrollRef = useRef<HTMLImageElement>(null);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const observer = new IntersectionObserver(observerCallback, options);
      if (infiniteScrollRef.current) observer.observe(infiniteScrollRef.current);

      return () => {
        if (infiniteScrollRef.current) observer.unobserve(infiniteScrollRef.current);
      };
    }, OBSERVER_DELAY);

    return () => clearTimeout(delay);
  }, [options]);

  return { infiniteScrollRef, isVisible, setIsVisible };
};
