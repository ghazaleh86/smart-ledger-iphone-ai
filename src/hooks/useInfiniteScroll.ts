
import { useState, useCallback, useEffect } from 'react';

export const useInfiniteScroll = (totalItems: number) => {
  const [displayedItems, setDisplayedItems] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || displayedItems >= totalItems) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + 10, totalItems));
      setIsLoading(false);
    }, 500);
  }, [isLoading, displayedItems, totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      // Improved mobile-friendly scroll detection
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when within 200px of bottom (better for mobile)
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return {
    displayedItems,
    isLoading,
    loadMore,
  };
};
