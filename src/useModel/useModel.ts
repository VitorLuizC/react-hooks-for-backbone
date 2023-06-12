import Backbone from 'backbone';
import {
  ObjectAsyncMethods,
  ObjectAsyncMethodKey,
  useObjectAsyncMethods,
} from '../useObjectAsyncMethods';
import { useModelAttributes } from '../useModelAttributes';
import { useMemo } from 'react';

export type UseModelResult<
  TAttributes extends Backbone.ObjectHash,
  TModel extends Backbone.Model<TAttributes>,
> = ObjectAsyncMethods<TModel> & { attributes: TAttributes };

function useModel<
  TAttributes extends Backbone.ObjectHash,
  TModel extends Backbone.Model<TAttributes>,
>(model: TModel): UseModelResult<TAttributes, TModel> {
  const methods = useObjectAsyncMethods(model);
  const attributes = useModelAttributes(model);

  return useMemo(() => {
    return new Proxy(methods, {
      get(methods, key) {
        if (key === 'attributes') {
          return attributes;
        }

        return methods[key as ObjectAsyncMethodKey<TModel>];
      },
    }) as UseModelResult<TAttributes, TModel>;
  }, [methods, attributes]);
}

export default useModel;
