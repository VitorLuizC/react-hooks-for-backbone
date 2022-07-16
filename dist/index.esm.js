/*!
 * react-hooks-for-backbone v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

import { useRef, useEffect, useCallback } from 'react';

/** React.js Hook that provides a function to check if component is mounted. */
function useMounted() {
    var mountedRef = useRef(true);
    useEffect(function () {
        return function () {
            mountedRef.current = false;
        };
    }, []);
    return useCallback(function () { return mountedRef.current; }, []);
}

export { useMounted };
//# sourceMappingURL=index.esm.js.map
