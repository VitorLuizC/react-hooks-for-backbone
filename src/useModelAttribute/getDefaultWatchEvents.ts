import type { Model } from 'backbone';
import getChangeEvent from '../utils/getChangeEvent';

/** Gets the default events' names for model's attributes. */
function getDefaultWatchEvents(model: Model, attributeName: string): string[] {
  return ['sync', 'change', getChangeEvent(model, attributeName)];
}

export default getDefaultWatchEvents;
