import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useObjectEventListener from './useObjectEventListener';

type User = Model<{
  name: string;
  isActive: boolean;
}>;

describe('useObjectEventListener', () => {
  let user: User;
  let handler: jest.Mock;

  beforeEach(() => {
    handler = jest.fn();
    user = new Model({
      name: 'Shigeo Kageyama',
      isActive: true,
    });
  });

  it("listens object's event and execute the callback", () => {
    renderHook(() => {
      useObjectEventListener(user, 'change:name', handler);
    });

    expect(handler).not.toHaveBeenCalled();

    act(() => {
      user.set('name', 'Mob');
    });

    expect(handler).toHaveBeenCalled();
  });

  it('binds object as context to the callback', (done) => {
    const handleNameChange = jest.fn(
      // A regular function was used to allow context bound.
      function handleNameChange(this: User) {
        expect(this).toBe(user);
        done();
      },
    );

    renderHook(() => {
      useObjectEventListener(user, 'rename', handleNameChange);
    });

    act(() => {
      user.trigger('rename', 'Mob');
    });
  });

  it("doesn't throw errors when receives nullish model", () => {
    const handleNameChange = jest.fn(
      // A regular function was used to allow context bound.
      function handleNameChange(this: User) {
        // Does nothing.
      },
    );

    expect(() => {
      renderHook(() => {
        useObjectEventListener(null, 'rename', handleNameChange);
      });
    }).not.toThrow();
  });

  describe('when component unmounts', () => {
    it("stops listening the model's event", () => {
      const { unmount } = renderHook(() => {
        useObjectEventListener(user, 'change:name', handler);
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
