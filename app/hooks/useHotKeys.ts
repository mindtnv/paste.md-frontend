import { useEffect } from "react";

export interface HotKey {
  handler: () => void;
  lockTimout?: number;
}

export interface KeyMap {
  [key: string]: HotKey;
}

const handlerFabric = (keyMap: KeyMap) => {
  let locked = false;

  const handler = (e: KeyboardEvent) => {
    if (!locked && e.ctrlKey && e.key in keyMap) {
      locked = true;
      setTimeout(() => {
        locked = false;
      }, keyMap[e.key].lockTimout);

      keyMap[e.key].handler();
    }
    if (locked) e.preventDefault();
  };

  return handler;
};

export const useHotKeys = (keyMap: KeyMap) => {
  const handler = handlerFabric(keyMap);
  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyMap]);
  return handler;
};
