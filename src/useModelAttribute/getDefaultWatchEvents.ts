import getChangeEvent from '../utils/getChangeEvent';
import type AnyModel from '../types/AnyModel';

/** Gets the default events' names for model's attributes. */
function getDefaultWatchEvents(
  model: AnyModel,
  attributeName: string,
): string[] {
  return ['sync', 'change', getChangeEvent(model, attributeName)];
}

export default getDefaultWatchEvents;
