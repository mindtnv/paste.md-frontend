import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item === null ? initialValue : JSON.parse(item);
    } catch (_) {
      return initialValue;
    }
  });

  const newSetState = (value: T | ((val: T) => T)) => {
    try {
      const evaluatedValue = value instanceof Function ? value(state) : value;
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(evaluatedValue));
      }
      setState(evaluatedValue);
    } catch (e) {
      console.error(e);
    }
  };

  return [state, newSetState];
};
