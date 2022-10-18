import { EffectCallback, useEffect, useRef } from 'react';
import equal from 'lodash.isequal';

/**
 * React.js Hook that runs an effect but compare dependencies using the
 * `fast-deep-equal` algorithm.
 */
function useEffectWithDeepEqual(
  effect: EffectCallback,
  dependencies: unknown[],
) {
  const previousDependenciesRef = useRef<unknown[]>();

  useEffect(() => {
    if (equal(dependencies, previousDependenciesRef.current)) return;

    previousDependenciesRef.current = dependencies;

    return effect();
  }, dependencies);
}

export default useEffectWithDeepEqual;
