import { Model } from 'backbone';
import { act, renderHook } from '@testing-library/react';
import useObjectsEventsListeners from './useObjectsEventsListeners';

type User = Model<{
  name: string;
  isActive: boolean;
}>;

describe('useBackboneListenTo', () => {
  let user: User;
  let handler: jest.Mock;

  beforeEach(() => {
    handler = jest.fn();

    user = new Model({
      name: 'Shigeo Kageyama',
      isActive: true,
    });
  });

  it("listens objects' events and execute the callback", () => {
    renderHook(() => {
      useObjectsEventsListeners(
        [
          [user, 'change:name'],
          [user, 'rename', 'update'],
          [user, 'change:isActive'],
        ],
        handler,
      );
    });

    expect(handler).not.toHaveBeenCalled();

    act(() => {
      user.set('name', 'Mob');
    });

    expect(handler).toHaveBeenCalledTimes(1);

    act(() => {
      user.trigger('rename');
      user.trigger('update');
    });

    expect(handler).toHaveBeenCalledTimes(3);

    act(() => {
      user.set('isActive', false);
    });

    expect(handler).toHaveBeenCalledTimes(4);
  });

  it("doesn't throw errors when receives nullish objects", () => {
    expect(() => {
      renderHook(() => {
        useObjectsEventsListeners(
          [
            [null, 'change:name'],
            [undefined, 'rename', 'update'],
          ],
          handler,
        );
      });
    }).not.toThrow();
  });

  describe('when unmounts', () => {
    it('stops listening events', () => {
      const { unmount } = renderHook(() => {
        useObjectsEventsListeners([user, 'change:name'], handler);
      });

      expect(handler).not.toHaveBeenCalled();

      act(() => {
        user.set('name', 'Mob');
      });

      expect(handler).toHaveBeenCalledTimes(1);

      unmount();

      act(() => {
        user.set('name', 'White T-Poison');
      });

      // Don't execute the callback
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
