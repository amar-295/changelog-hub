import { useState, useRef, useCallback } from "react";

/**
 * Standard SaaS UX Tooltip Hook
 * - 350ms show delay (prevents flash on fast pass-through)
 * - 0ms hide delay (feels snappy)
 * - Hide-on-click with suppression until fresh hover
 */
export function useTooltip(showDelay = 350) {
  const [isVisible, setIsVisible] = useState(false);
  const suppressed = useRef(false);
  const timer = useRef(null);

  const showTooltip = useCallback(() => {
    if (suppressed.current) return;
    timer.current = setTimeout(() => setIsVisible(true), showDelay);
  }, [showDelay]);

  const hideTooltip = useCallback(() => {
    clearTimeout(timer.current);
    setIsVisible(false);
    suppressed.current = false;
  }, []);

  const hideAndSuppress = useCallback(() => {
    clearTimeout(timer.current);
    setIsVisible(false);
    suppressed.current = true;
  }, []);

  return {
    isVisible,
    showTooltip,
    hideTooltip,
    hideAndSuppress,
  };
}
