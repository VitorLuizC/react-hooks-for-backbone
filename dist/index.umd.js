/*!
 * react-hooks-for-backbone v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactHooksForBackbone = {}, global.React));
})(this, (function (exports, react) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
