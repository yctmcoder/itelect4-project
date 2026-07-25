// src/hooks/usePrevious.ts

import { useRef, useEffect } from "react";

// Generic T -- works for any state type
// (string, number, Book, Member, etc.)
function usePrevious<T>(value: T): T | undefined {
  // useRef<T>() alone will NOT compile
  // It needs an initial value
  const ref = useRef<T | undefined>(undefined);

  // Update the ref after the value changes
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value
  return ref.current;
}

export default usePrevious;