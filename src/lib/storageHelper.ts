import "client-only";

export function getLocalStorage(key: string, defaultValue: any) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  if (ls) {
    const stickyValue = ls.getItem(key);
    if (stickyValue !== null && stickyValue !== "undefined") {
      return JSON.parse(stickyValue);
    }
  }
  return defaultValue;
}

export function setLocalStorage(key: string, value: any) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  if (ls) {
    ls.setItem(key, JSON.stringify(value));
  }
}
