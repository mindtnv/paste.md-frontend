import { useEffect, useRef } from "react";

export interface VimNavigationOptions {
  scrollSpeed: number;
}

const vimNavigation = (target: HTMLElement, options: VimNavigationOptions) => {
  let previousKey = "";
  let scrollAccumulator = 0;
  const accumulator = (event: KeyboardEvent) => {
    if (event.key === "j") scrollAccumulator = options.scrollSpeed;
    if (event.key === "k") scrollAccumulator = -options.scrollSpeed;
  };

  const resetScroll = () => {
    scrollAccumulator = 0;
  };

  const scroller = setInterval(function () {
    window.scrollBy({ top: scrollAccumulator });
  }, 5);

  const hotKeys = (event: KeyboardEvent) => {
    if (event.key === "G" && event.shiftKey)
      window.scrollTo({
        top: document.body.offsetHeight,
        behavior: "smooth",
      });
    else if (event.key === "g" && previousKey === "g")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    previousKey = event.key;
  };

  target.addEventListener("keydown", accumulator);
  target.addEventListener("keydown", hotKeys);
  target.addEventListener("keyup", resetScroll);

  return [
    () => target.removeEventListener("keydown", accumulator),
    () => target.removeEventListener("keydown", hotKeys),
    () => target.removeEventListener("keyup", resetScroll),
    () => clearInterval(scroller),
  ];
};

export const useVimNavigation = (options: VimNavigationOptions) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref !== null && ref.current !== null)
      ref.current.focus({
        preventScroll: true,
      });
  });
  useEffect(() => {
    if (ref !== null) {
      const clean = vimNavigation(ref.current!, options);
      return () => clean.forEach((c) => c());
    }
  }, [ref]);
  return ref;
};
