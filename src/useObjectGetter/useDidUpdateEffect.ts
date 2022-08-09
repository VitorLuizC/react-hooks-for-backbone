import { EffectCallback, useEffect, useRef } from 'react';

/** React.js Hook that runs an effect when component did update. */
function useDidUpdateEffect(
  effect: EffectCallback,
  dependencies: unknown[] = [],
): void {
  const isFirstRender = useRef(true);

  const firstRenderEffect = () => {
    isFirstRender.current = false;
  };

  useEffect(isFirstRender.current ? firstRenderEffect : effect, dependencies);
}

export default useDidUpdateEffect;
