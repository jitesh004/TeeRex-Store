export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export const addItemToCart = (payload) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload,
  });
};

export const deleteItemFromCart = (payload) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM,
    payload,
  });
};

export const removeItemFromCart = (payload) => (dispatch) => {
  dispatch({
    type: REMOVE_ITEM,
    payload,
  });
};
