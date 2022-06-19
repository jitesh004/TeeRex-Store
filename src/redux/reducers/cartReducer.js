import { ADD_ITEM, DELETE_ITEM, REMOVE_ITEM } from "../actions/cart.action";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  const { payload } = action;
  const item = state.cartItems.find((product) => product.id === payload.id);
  const newArray = state.cartItems.filter(
    (product) => product.id !== payload.id
  );

  switch (action.type) {
    case ADD_ITEM:
      if (item) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  qty: payload.qty,
                }
              : item
          ),
          totalPrice: state.totalPrice + payload.price,
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, payload],
        totalPrice: state.totalPrice + payload.price,
      };

    case DELETE_ITEM:
      if (payload.qty > 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  qty: payload.qty,
                }
              : item
          ),
          totalPrice: state.totalPrice - payload.price,
        };
      }

      return {
        ...state,
        cartItems: [...newArray],
        totalPrice: state.totalPrice - payload.price,
      };

    case REMOVE_ITEM:
      const totalPrice = state.totalPrice - payload.price * payload.qty;
      return {
        ...state,
        cartItems: [...newArray],
        totalPrice: totalPrice,
      };
    default:
      return state;
  }
};

export default cartReducer;
