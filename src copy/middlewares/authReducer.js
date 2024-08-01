import { SET_USER, SET_ERROR, SIGN_OUT } from './authActions.js';

const initialState = {
  isAuthenticated: false,
  user: null,
  errorMessage: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload,
                user: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
