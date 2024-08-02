import { CacheHandler } from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-stack';
import createRedisInstance from './src/shared/libs/redis';

CacheHandler.onCreation(async () => {
  const client = await createRedisInstance();

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (client?.isReady) {
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createRedisHandler({
      client,
      keyPrefix: 'NEXT_CACHE_PREFIX:',
      timeoutMs: 3000,
    });
  } else {
    // Fallback to LRU handler if Redis client is not available.
    // The application will still work, but the cache will be in memory only and not shared.
    handler = createLruHandler();
    console.warn('Falling back to LRU handler because Redis client is not available.');
  }

  return {
    handlers: [handler],
  };
});

export default CacheHandler;
