import type { Model } from 'backbone';

/**
 * Model that has any attributes, set options and static attributes.
 *
 * Commonly used as generic constraint for any model, or parameter type for
 * functions that handles any model in the same way.
 */
type AnyModel = Model<any, any, any>;

export default AnyModel;
