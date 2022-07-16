/*!
 * react-hooks-for-backbone v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/** React.js Hook that provides a function to check if component is mounted. */
function useMounted() {
    var mountedRef = react.useRef(true);
    react.useEffect(function () {
        return function () {
            mountedRef.current = false;
        };
    }, []);
    return react.useCallback(function () { return mountedRef.current; }, []);
}

exports.useMounted = useMounted;
//# sourceMappingURL=index.cjs.map
