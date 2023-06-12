import { act, renderHook } from '@testing-library/react';
import { Collection, Model } from 'backbone';
import useCollectionItems from './useCollectionItems';

type UserAttributes = {
  name: string;
};

describe('useCollectionItems', () => {
  const users = new Collection([
    new Model<UserAttributes>({ name: 'Vladimir' }),
  ]);

  it("returns collection's models", () => {
    const { result } = renderHook(() => useCollectionItems(users));

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toBeInstanceOf(Model);
    expect(result.current[0]?.get('name')).toBe('Vladimir');
  });

  it('keeps in sync with the collection', () => {
    const { result } = renderHook(() => useCollectionItems(users));

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toBeInstanceOf(Model);
    expect(result.current[0]?.get('name')).toBe('Vladimir');

    act(() => {
      users.add(new Model({ name: 'Krupskaya' }));
    });

    expect(result.current).toHaveLength(2);
    expect(result.current[1]).toBeInstanceOf(Model);
    expect(result.current[1]?.get('name')).toBe('Krupskaya');

    act(() => {
      users.shift();
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toBeInstanceOf(Model);
    expect(result.current[0]?.get('name')).toBe('Krupskaya');
  });

  it("watches events from collection's from related objects", () => {
    let renders = 0;

    const permissions = new Model({
      add_users: false,
    });

    renderHook(() => {
      renders++;

      useCollectionItems(users, {
        watchEvents: ['change:name'],
        watchRelatedEvents: [permissions, 'change:add_users'],
      });
    });

    expect(renders).toBe(1);

    act(() => {
      users.first().set('name', 'Nádia');
    });

    expect(renders).toBe(2);

    act(() => {
      permissions.set('add_users', true);
    });

    expect(renders).toBe(3);
  });
});
