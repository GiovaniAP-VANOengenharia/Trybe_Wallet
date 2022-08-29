import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA: {
    return {
      ...state,
      ...action.xablau,
    };
  }
  default: return state;
  }
};

export default userReducer;
