export const initialState = null;
 
export const AccessToken = (state = null, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload;
    case 'REMOVE_TOKEN':
      return null;
    default:
      return state;
  }
};
