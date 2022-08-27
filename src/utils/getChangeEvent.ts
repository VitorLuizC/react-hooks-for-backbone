import type AnyModel from '../types/AnyModel';

/** Gets the change event name for the model's attribute. */
function getChangeEvent(model: AnyModel, attributeName: string): string {
  return attributeName === model.idAttribute
    ? 'changeId'
    : `change:${attributeName}`;
}

export default getChangeEvent;
