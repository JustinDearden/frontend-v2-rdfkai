import { useState, useEffect, useCallback } from 'react';

export function useRateLimit(limit: number, timeframe: number) {
  const [clickCount, setClickCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    if (clickCount >= limit) {
      setIsRateLimited(true);
      const timer = setTimeout(() => {
        setClickCount(0);
        setIsRateLimited(false);
      }, timeframe);
      return () => clearTimeout(timer);
    }
  }, [clickCount, limit, timeframe]);

  const registerClick = useCallback(() => {
    if (!isRateLimited) {
      setClickCount((prev) => prev + 1);
    }
  }, [isRateLimited]);

  return { isRateLimited, registerClick };
}
