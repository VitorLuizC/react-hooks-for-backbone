import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useListenTo from './useListenTo';

describe('useListenTo', () => {
  let user: Model<{
    name: string;
    isActive: boolean;
  }>;
  let handler: jest.Mock;

  beforeEach(() => {
    handler = jest.fn();
    user = new Model({
      name: 'Shigeo Kageyama',
      isActive: true,
    });
  });

  it("listens model's event and execute the callback", () => {
    renderHook(() => {
      useListenTo(user, 'change:name', handler);
    });

    expect(handler).not.toHaveBeenCalled();

    act(() => {
      user.set('name', 'Mob');
    });

    expect(handler).toHaveBeenCalled();
  });

  describe('when component unmounts', () => {
    it("stops listening the model's event", () => {
      const { unmount } = renderHook(() => {
        useListenTo(user, 'change:name', handler);
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

      // 'handler' won't be called again.
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
