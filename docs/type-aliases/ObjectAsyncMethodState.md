[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectAsyncMethodState

# Type Alias: ObjectAsyncMethodState\<TResult\>

> **ObjectAsyncMethodState**\<`TResult`\> = \{ `error`: `null`; `result`: `null`; `status`: `"idle"`; \} \| \{ `error`: `Error`; `result`: `null`; `status`: `"failed"`; \} \| \{ `error`: `Error` \| `null`; `result`: `TResult` \| `null`; `status`: `"pending"`; \} \| \{ `error`: `null`; `result`: `TResult`; `status`: `"completed"`; \}

Defined in: [useObjectAsyncMethods/ObjectAsyncMethodState.ts:2](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectAsyncMethods/ObjectAsyncMethodState.ts#L2)

State of an object async method.

## Type Parameters

### TResult

`TResult`
