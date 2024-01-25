import { combineReducers } from 'redux';
import { SET_PIZZA_OPTIONS, INCREMENT_ORDER_COUNT, DECREMENT_ORDER_COUNT, SET_ORDER_STAGE, CANCEL_ORDER, MOVE_TO_NEXT_STAGE, MOVE_TO_PICKED_STAGE } from '../actions';

const pizzaOptionsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PIZZA_OPTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const orderCountReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_ORDER_COUNT:
      return state + 1;
    case DECREMENT_ORDER_COUNT:
      return state - 1;
    default:
      return state;
  }
};

const initialOrderStagesState = {};

const orderStagesReducer = (state = initialOrderStagesState, action) => {
    switch (action.type) {
      case SET_ORDER_STAGE:
        return { ...state, [action.payload.orderId]: { stage: action.payload.stage, timestamp: Date.now() } };
      case CANCEL_ORDER:
        const { [action.payload]: canceledOrder, ...restOrders } = state;
        return restOrders;
        case MOVE_TO_NEXT_STAGE:
            const currentOrder = state[action.payload];
            if (currentOrder) {
                const nextStage = getNextStage(currentOrder.stage);
                return {
                  ...state,
                  [action.payload]: { stage: nextStage, timestamp: Date.now() },
                };
              }
              return state;
          case MOVE_TO_PICKED_STAGE:
            
            return {
              ...state,
              [action.payload]: { stage: 'Order Picked', timestamp: Date.now() },
            };
          default:
            return state;
        }
      };

      const getNextStage = (currentStage) => {
        // Define the order of stages
        const stageOrder = ['Order Placed', 'Order In Making', 'Order Ready', 'Order Picked'];
      
        // Find the index of the current stage
        const currentIndex = stageOrder.indexOf(currentStage);
      
        // Return the next stage or the current stage if it's the last stage
        return currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : currentStage;
      };

const rootReducer = combineReducers({
  pizzaOptions: pizzaOptionsReducer,
  orderCount: orderCountReducer,
  orderStages: orderStagesReducer,
});

export default rootReducer;
