[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectAsyncMethodResult

# Type Alias: ObjectAsyncMethodResult\<TAsyncMethod\>

> **ObjectAsyncMethodResult**\<`TAsyncMethod`\> = `TAsyncMethod` *extends* (`this`, ...`args`) => infer TPromise ? `TPromise` *extends* `JQuery.jqXHR`\<infer TResult\> ? `TResult` : `TPromise` *extends* `PromiseLike`\<infer TResult\> ? `TResult` : `unknown` : `unknown`

Defined in: [useObjectAsyncMethods/ObjectAsyncMethodResult.ts:7](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectAsyncMethods/ObjectAsyncMethodResult.ts#L7)

Result from object async method. It's an unwrapped value from the returned
`PromiseLike` object (e.g., `JQuery.jqXHR<TResult>` ou `Promise<TResult>`).

## Type Parameters

### TAsyncMethod

`TAsyncMethod` *extends* [`AnyAsyncFunction`](AnyAsyncFunction.md)
