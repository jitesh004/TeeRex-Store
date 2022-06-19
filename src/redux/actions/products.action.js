export const PRODUCT_RESPONSE = "PRODUCT_RESPONSE";

export const saveProdcutResponseToStore = (payload) => (dispatch) => {
  dispatch({
    type: PRODUCT_RESPONSE,
    payload,
  });
};
