"use client";

import { useState } from "react";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  params: any;
}

// Cache with a 5-minute expiry by default
const CACHE_EXPIRY = 5 * 60 * 1000;
const cache: Record<string, CacheItem<any>> = {};

export function useCache<T>(
  key: string,
  fetcher: (...args: any[]) => Promise<T>,
  expiryMs: number = CACHE_EXPIRY
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (...args: any[]) => {
    const cacheKey = `${key}-${JSON.stringify(args)}`;
    const now = Date.now();
    const cachedItem = cache[cacheKey];

    // Use cache if it exists and is still valid
    if (
      cachedItem &&
      now - cachedItem.timestamp < expiryMs &&
      JSON.stringify(cachedItem.params) === JSON.stringify(args)
    ) {
      setData(cachedItem.data);
      return cachedItem.data;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher(...args);
      setData(result);

      // Update cache
      cache[cacheKey] = {
        data: result,
        timestamp: now,
        params: args,
      };

      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCache = (specificKey?: string) => {
    if (specificKey) {
      Object.keys(cache).forEach((cacheKey) => {
        if (cacheKey.startsWith(`${specificKey}-`)) {
          delete cache[cacheKey];
        }
      });
    } else {
      Object.keys(cache).forEach((cacheKey) => {
        if (cacheKey.startsWith(`${key}-`)) {
          delete cache[cacheKey];
        }
      });
    }
  };

  return { loading, data, error, fetchData, clearCache };
}
