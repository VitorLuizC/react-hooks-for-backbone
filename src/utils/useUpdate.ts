import { useReducer } from 'react';

/** Function that gets an unique symbol as update id. */
function getUpdateId(): symbol {
  return Symbol('update id');
}

/** Constant with the initial update id. */
const INITIAL_UPDATE_ID = getUpdateId();

/**
 * React.js Hook that provides an unique symbol as current update id and a
 * function to update it (that works as force update).
 */
function useUpdate(): [updateId: symbol, update: () => void] {
  return useReducer(getUpdateId, INITIAL_UPDATE_ID);
}

export default useUpdate;
