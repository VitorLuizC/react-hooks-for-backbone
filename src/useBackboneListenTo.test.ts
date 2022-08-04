import { Model } from 'backbone';
import { act, renderHook } from '@testing-library/react';
import useBackboneListenTo from './useBackboneListenTo';

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
      useBackboneListenTo(
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

  describe('when unmounts', () => {
    it('stops listening events', () => {
      const { unmount } = renderHook(() => {
        useBackboneListenTo([user, 'change:name'], handler);
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
