import Backbone from 'backbone';
import {
  ObjectAsyncMethods,
  ObjectAsyncMethodKey,
  useObjectAsyncMethods,
} from '../useObjectAsyncMethods';
import { useMemo } from 'react';
import { AnyModel } from '../types';
import {
  UseCollectionItemsOptions,
  useCollectionItems,
} from '../useCollectionItems';

export type UseCollectionOptions = UseCollectionItemsOptions;

export type UseCollectionResult<
  TModel extends AnyModel,
  TCollection extends Backbone.Collection<TModel>,
> = ObjectAsyncMethods<TCollection> & { items: TModel[] };

function useCollection<
  TModel extends AnyModel,
  TCollection extends Backbone.Collection<TModel>,
>(
  collection: TCollection,
  options: UseCollectionOptions,
): UseCollectionResult<TModel, TCollection> {
  const items = useCollectionItems(collection, options);
  const methods = useObjectAsyncMethods(collection);

  return useMemo(() => {
    return new Proxy(methods, {
      get(methods, key) {
        if (key === 'items') {
          return items;
        }

        return methods[key as ObjectAsyncMethodKey<TCollection>];
      },
    }) as UseCollectionResult<TModel, TCollection>;
  }, [items, methods]);
}

export default useCollection;
