import { ADD_USER } from '../actions/userActions.js';

const initialState = {
    id: 0,
    userName: '',
    lastName: '',
    email: '',
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userName: action.user.userName,
                email: action.user.email
            }
        default:
            return state;
    }

}


