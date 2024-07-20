interface CacheItem<T> {
    data: T;
    expiry: number;
  }
  
  class Cache<T> {
    private cache: Map<string, CacheItem<T>> = new Map();
  
    set(key: string, value: T, ttl: number): void {
      const expiry = Date.now() + ttl;
      this.cache.set(key, { data: value, expiry });
    }
  
    get(key: string): T | null {
      const item = this.cache.get(key);
      if (!item) return null;
  
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
  
      return item.data;
    }
  
    clear(): void {
      this.cache.clear();
    }
  }
  
  export const globalCache = new Cache<any>();