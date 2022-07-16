import { useCallback, useEffect, useRef } from 'react';

/** Function that checks if component is mounted. */
export type IsMounted = () => boolean;

/** React.js Hook that provides a function to check if component is mounted. */
function useMounted(): IsMounted {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}

export default useMounted;
