import type { Model } from 'backbone';

/** Gets the change event name for the model's attribute. */
function getChangeEvent(model: Model, attributeName: string): string {
  return attributeName === model.idAttribute
    ? 'changeId'
    : `change:${attributeName}`;
}

export default getChangeEvent;
