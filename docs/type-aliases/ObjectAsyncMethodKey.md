[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectAsyncMethodKey

# Type Alias: ObjectAsyncMethodKey\<TObject\>

> **ObjectAsyncMethodKey**\<`TObject`\> = `{ readonly [TObjectKey in KeyOf<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction ? TObjectKey : never }`\[[`KeyOf`](KeyOf.md)\<`TObject`\>\]

Defined in: [useObjectAsyncMethods/isObjectAsyncMethodKey.ts:4](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectAsyncMethods/isObjectAsyncMethodKey.ts#L4)

Union between object async method keys.

## Type Parameters

### TObject

`TObject` *extends* `object`
