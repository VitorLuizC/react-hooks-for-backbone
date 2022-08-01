/*!
 * react-hooks-for-backbone v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * React.js Hook that provides a handler function that persists its reference,
 * but calls the most recent received callback.
 *
 * @example
 *
 * ```js
 * const Button = memo(ui.Button);
 *
 * function Count() {
 *   const [count, setCount] = useState(0);
 *
 *   const handleClick = useHandler(() => {
 *     setCount(count + 1);
 *   });
 *
 *   // This Button won't re-render because its props' values never change.
 *   return (
 *     <>
 *       Count: {count}
 *       <Button onClick={handleClick}>+1</Button>
 *     </>
 *   );
 * }
 * ```
 */
function useHandler(handler) {
    var handlerRef = react.useRef(handler);
    handlerRef.current = handler;
    function executeHandler() {
        // 'Function.prototype.apply' requires an ArrayLike, so 'arguments' is fine.
        // eslint-disable-next-line prefer-rest-params
        return handlerRef.current.apply(this, arguments);
    }
    return react.useCallback(executeHandler, []);
}

/**
 * React.js Hook that listens model's, or collection's, events and execute the
 * callback when they happen. It also pass model, or collection, as context to
 * the callback.
 *
 * @example
 *
 * ```js
 * useListenTo(user, ['sync', 'change'], function (this: UserModel) {
 *   updatePermissions(this.get('roles'));
 * });
 * ```
 */
function useBackboneEventListener(object, eventOrEvents, callback) {
    var events = Array.isArray(eventOrEvents)
        ? eventOrEvents.join(' ')
        : eventOrEvents;
    var handler = useHandler(callback);
    react.useEffect(function () {
        if (!events)
            return;
        object.on(events, handler);
        return function () {
            object.off(events, handler);
        };
    }, [object, events, handler]);
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * React.js Hook that calculates a result derived from the received model, or
 * collection, and a list values. It's calculated on the first-render and
 * every time watched values change, or watched events are emitted.
 *
 * @remarks
 *
 * ⚠️ it doesn't react to getter function's change, only to 'object' and the
 * watched 'values' and 'events'.
 *
 * @example
 *
 * ```ts
 * type User = Model<{
 *   first_name: string;
 *   last_name: string;
 * }>;
 *
 * function getFullName(user: User) {
 *   return user.get('first_name') + ' ' + user.get('last_name');
 * }
 *
 * const fullName = useGetter(getFullName, {
 *   object: user,
 *   watch: {
 *     events: ['sync', 'change'],
 *   },
 * });
 * ```
 */
function useBackboneGetter(getter, options) {
    var object = options.object, _a = options.watch, _b = _a === void 0 ? {} : _a, _c = _b.values, values = _c === void 0 ? [] : _c, _d = _b.events, events = _d === void 0 ? [] : _d;
    var getResult = useHandler(function () {
        return getter.apply(void 0, __spreadArray([object], values, false));
    });
    var _e = react.useState(getResult), result = _e[0], setResult = _e[1];
    var updateResult = function () { return setResult(getResult); };
    react.useEffect(updateResult, __spreadArray([object], values, true));
    useBackboneEventListener(object, events, updateResult);
    return result;
}

exports.useBackboneEventListener = useBackboneEventListener;
exports.useBackboneGetter = useBackboneGetter;
//# sourceMappingURL=index.js.map
