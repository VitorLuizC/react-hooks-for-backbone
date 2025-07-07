import type { Model } from 'backbone';

/**
 * Model that has any attributes, set options and static attributes.
 *
 * Commonly used as generic constraint for any model, or parameter type for
 * functions that handles any model in the same way.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyModel = Model<any, any, any>;

export default AnyModel;
