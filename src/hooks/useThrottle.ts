import { useState, useEffect, useCallback } from 'react';

/**
 * useRateLimit
 * @param limit Maximum number of allowed clicks within the timeframe.
 * @param timeframe Timeframe in milliseconds.
 * @returns { isRateLimited, registerClick } where:
 *   - isRateLimited is a boolean indicating if the limit has been exceeded.
 *   - registerClick is a function to call on each click.
 */
export function useRateLimit(limit: number, timeframe: number) {
  const [clickCount, setClickCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // When the click count reaches or exceeds the limit, mark as rate limited.
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

  // registerClick increases the click count if not already rate limited.
  const registerClick = useCallback(() => {
    if (!isRateLimited) {
      setClickCount((prev) => prev + 1);
    }
  }, [isRateLimited]);

  return { isRateLimited, registerClick };
}
