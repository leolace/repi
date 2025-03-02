import { useEffect, useSyncExternalStore } from "react";

const keyStore = {
  key: "",
  listeners: [] as VoidFunction[],
  handleKeyPress: (event: KeyboardEvent) => keyStore.setKey(event.key),

  setKey(newKey: string) {
    this.key = newKey;
    this.listeners.forEach((listener) => listener());
  },

  subscribe(listener: VoidFunction) {
    this.listeners.push(listener);

    if (this.listeners.length === 1) {
      window.addEventListener("keydown", this.handleKeyPress);
    }

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);

      if (this.listeners.length === 0) {
        window.removeEventListener("keydown", this.handleKeyPress);
      }
    };
  },

  getSnapshot() {
    return this.key;
  },
};

export function useKeyPress(callback?: VoidFunction, keys?: string[] | string) {
  const key = useSyncExternalStore(
    keyStore.subscribe.bind(keyStore),
    keyStore.getSnapshot.bind(keyStore),
  );

  useEffect(() => {
    console.log("teste");
    if (callback) {
      if (Array.isArray(keys)) {
        if (keys.includes(key)) callback();
      } else if (keys) {
        if (key === keys) callback();
      } else callback();
    }
  }, [callback, keys, key]);

  return key;
}
