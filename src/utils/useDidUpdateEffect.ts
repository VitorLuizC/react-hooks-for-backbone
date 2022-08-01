import { EffectCallback, useEffect, useRef } from 'react';

/** React.js Hook that runs an effect when component did update. */
function useDidUpdateEffect(
  effect: EffectCallback,
  dependencies: unknown[] = [],
): void {
  const isFirstRender = useRef(true);

  const handleFirstRender = () => {
    isFirstRender.current = false;
  };

  useEffect(isFirstRender.current ? handleFirstRender : effect, dependencies);
}

export default useDidUpdateEffect;
