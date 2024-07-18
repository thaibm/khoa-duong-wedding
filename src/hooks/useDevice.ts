import { useWindowSize } from "./useWindowSize";

type DeviceType = "mobile" | "tablet" | "desktop";

export function useDevice(): DeviceType {
  const size = useWindowSize();

  if (!size.width) {
    return "desktop";
  }

  if (size.width <= 480) {
    return "mobile";
  }

  if (size.width <= 1024) {
    return "tablet";
  }

  return "desktop";
}
