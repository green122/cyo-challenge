export type CacheKey = string | (number | string)[];

const timeToCache = 3 * 60 * 1000;
const maxSize = 100;

interface CachedData {
  data: any;
  timestamp: number;
}
let simpleCache = new Map<string, CachedData>();

function serializator(key: CacheKey): string {
  return Array.isArray(key) ? key.join("-") : key;
}

export function getCachedData(key: CacheKey) {
  const serializedKey = serializator(key);

  const cachedData = simpleCache.get(serializedKey);
  if (!cachedData) {
    return null;
  }

  if (Date.now() > cachedData.timestamp + timeToCache) {
    simpleCache.delete(serializedKey);
    return null;
  }

  return cachedData.data;
}

export function storeCachedData(key: CacheKey, data: any) {
  if (simpleCache.size > maxSize) {
    const firstKey = simpleCache.keys().next().value;
    simpleCache.delete(firstKey);
  }
  simpleCache.set(serializator(key), { data, timestamp: Date.now() });
}

export function clearCache() {
  simpleCache = new Map<string, CachedData>();
}
