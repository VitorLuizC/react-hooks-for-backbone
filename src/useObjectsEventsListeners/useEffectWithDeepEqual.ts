import { EffectCallback, useEffect, useRef } from 'react';
import equal from 'lodash.isequal';

/**
 * React.js Hook that runs an effect but compare dependencies using the
 * `lodash.isequal` algorithm.
 */
function useEffectWithDeepEqual(
  effect: EffectCallback,
  dependencies: unknown[],
) {
  const dependenciesRef = useRef(dependencies);

  if (!equal(dependencies, dependenciesRef.current))
    dependenciesRef.current = dependencies;

  useEffect(effect, dependenciesRef.current);
}

export default useEffectWithDeepEqual;
