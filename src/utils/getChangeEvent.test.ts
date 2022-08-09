import { Model } from 'backbone';
import getChangeEvent from './getChangeEvent';

describe('getChangeEvent', () => {
  it("returns the change event for the models' attribute name", () => {
    const user = new Model({
      _id: Math.random(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.idAttribute = '_id';

    expect(getChangeEvent(user, '_id')).toBe('changeId');
    expect(getChangeEvent(user, 'createdAt')).toBe('change:createdAt');
  });
});
