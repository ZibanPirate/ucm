import { FC, useEffect, useState } from "react";

export const MediaQuery: FC<{ query: string }> = ({ children, query }) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const matchMedia = window.matchMedia(query);
      const matchMediaCallback = (e: MediaQueryListEvent) => setMatches(e.matches);
      matchMedia.addEventListener("change", matchMediaCallback);
      setMatches(window.matchMedia(query).matches);
      return () => {
        matchMedia.removeEventListener("change", matchMediaCallback);
      };
    }
  }, []);
  return <>{matches ? children : null}</>;
};
