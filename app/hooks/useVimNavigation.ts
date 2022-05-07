import { useEffect } from "react";

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

export const useVimNavigation = (
  target: HTMLElement,
  options: VimNavigationOptions
) => {
  useEffect(() => {
    if (target !== null) {
      const clean = vimNavigation(target, options);
      return () => clean.forEach((c) => c());
    }
  });
};
