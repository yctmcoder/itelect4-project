// src/hooks/useToggle.ts

import { useState } from "react";

// Custom hook for toggling a boolean value
// Explicit return type: a tuple of [current value, toggle function]
function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((previousValue) => !previousValue);
  };

  return [value, toggle];
}

export default useToggle;