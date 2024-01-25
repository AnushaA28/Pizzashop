export const SET_PIZZA_OPTIONS = 'SET_PIZZA_OPTIONS';
export const INCREMENT_ORDER_COUNT = 'INCREMENT_ORDER_COUNT';
export const DECREMENT_ORDER_COUNT = 'DECREMENT_ORDER_COUNT';
export const SET_ORDER_STAGE = 'SET_ORDER_STAGE';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const MOVE_TO_NEXT_STAGE = 'MOVE_TO_NEXT_STAGE';
export const MOVE_TO_PICKED_STAGE = 'MOVE_TO_PICKED_STAGE';

export const setPizzaOptions = (options) => ({
  type: SET_PIZZA_OPTIONS,
  payload: options,
});

export const incrementOrderCount = () => ({
  type: INCREMENT_ORDER_COUNT,
});

export const decrementOrderCount = () => ({
  type: DECREMENT_ORDER_COUNT,
});

export const setOrderStage = (orderId, stage) => ({
    type: SET_ORDER_STAGE,
    payload: { orderId, stage },
});

export const cancelOrder = (orderId) => ({
    type: CANCEL_ORDER,
    payload: orderId,
});

export const moveToNextStage = (orderId) => ({
    type: MOVE_TO_NEXT_STAGE,
    payload: orderId,
})

export const moveToPickedStage = (orderId) => ({
    type: MOVE_TO_PICKED_STAGE,
    payload: orderId,
});