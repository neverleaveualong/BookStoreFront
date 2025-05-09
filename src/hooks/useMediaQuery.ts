import { useEffect, useState } from "react";
import { getTheme } from "../style/theme";

export const useMediaQuery = () => {
  const [isMobile, SetIsMobile] = useState(
    window.matchMedia(getTheme("light").mediaQuery.mobile).matches
  );

  useEffect(() => {
    const isMobileQuery = window.matchMedia("(max-width: 768px");

    SetIsMobile(isMobileQuery.matches);
  }, []);

  return { isMobile };
};
