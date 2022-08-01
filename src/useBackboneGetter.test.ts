import { renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useBackboneGetter from './useBackboneGetter';

type User = Model<{
  firstName: string;
  lastName: string;
}>;

describe('useBackboneGetter', () => {
  const getFullName = (user: User) => {
    const firstName = user.get('firstName');
    const lastName = user.get('lastName');

    if (!firstName) return 'Unknown';

    if (!lastName) return firstName;

    return firstName.concat(' ', lastName);
  };

  describe('when is the first render', () => {
    it('returns retult using getter function', () => {
      const user: User = new Model({
        firstName: 'Karl',
        lastName: 'Marx',
      });

      const { result } = renderHook(() => {
        return useBackboneGetter(getFullName, {
          object: user,
        });
      });

      expect(result.current).toBe('Karl Marx');
    });
  });
});
