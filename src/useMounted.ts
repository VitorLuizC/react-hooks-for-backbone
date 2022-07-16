import { useCallback, useEffect, useRef } from 'react';

/** @typedef {function(): boolean} IsMounted */
export type IsMounted = () => boolean;

/**
 * React.js Hook that provides a function to check if component is mounted.
 * @returns {IsMounted}
 */
function useMounted(): () => boolean {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}

export default useMounted;
