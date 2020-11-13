import { ADD_USER, LOGIN_USER } from '../actions/userActions.js';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    id: 0,
    name: '',
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
        case LOGIN_USER:
            console.log('SOY LA RESPUESTA 3', action.user)
            return {
                ...state,
                id: action.user.data.id.id,
                name: action.user.data.id.username,
                token: action.user.data.token,
                email: action.user.data.id.email  
            }
        default:
            return state;
    }

}


