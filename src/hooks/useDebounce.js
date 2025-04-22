import { useState, useEffect } from "react";
function useDebounce(initializeValue, delay) {
  const [debouncedValue, setDebouncedValue] = useState(initializeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(initializeValue);
    }, delay);
    // Xoá timeout nếu value thay đổi trước khi hết delay
    return () => clearTimeout(timer);
  }, [delay, initializeValue]);
  return debouncedValue;
}
export default useDebounce;
