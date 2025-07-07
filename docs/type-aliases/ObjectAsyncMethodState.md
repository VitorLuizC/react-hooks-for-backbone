[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectAsyncMethodState

# Type Alias: ObjectAsyncMethodState\<TResult\>

> **ObjectAsyncMethodState**\<`TResult`\> = \{ `error`: `null`; `result`: `null`; `status`: `"idle"`; \} \| \{ `error`: `Error`; `result`: `null`; `status`: `"failed"`; \} \| \{ `error`: `Error` \| `null`; `result`: `TResult` \| `null`; `status`: `"pending"`; \} \| \{ `error`: `null`; `result`: `TResult`; `status`: `"completed"`; \}

Defined in: [useObjectAsyncMethods/ObjectAsyncMethodState.ts:2](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectAsyncMethods/ObjectAsyncMethodState.ts#L2)

State of an object async method.

## Type Parameters

### TResult

`TResult`
