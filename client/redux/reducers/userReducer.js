import { ADD_USER, LOGIN_USER,USER_BY_ID } from '../actions/userActions.js';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    id: null,
    surname:'',
    email: '',
    birthday:'',
    phone_number:'',
    adress:'',
    token: null,

    balanceArs: 0,
    balanceUsd: 0,
    code: "0",
    idAccount: null,
      
      
    
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
            console.log('SOY LA RESPUESTA asdasd', action.user)
            return {
                ...state,
                id: action.user.logUser.id,
                name: action.user.logUser.username,
                token: action.user.token,
                email: action.user.logUser.email,

                balanceArs: action.user.logUser.account.balanceArs,
                balanceUsd: action.user.logUser.account.balanceUsd,
                code: action.user.logUser.account.code,
                idAccount: action.user.logUser.account.id,
            }
        case USER_BY_ID: 
            return {
                ...state,
                id: action.user.id,
                name: action.user.username,
                surname:action.user.surname,
                email: action.user.email,
                birthday:action.user.birthday,
                phone_number:action.user.phone_number,
                adress:action.user.adress,
                balanceArs: action.user.account.balanceArs,
                balanceUsd: action.user.account.balanceUsd,
                code: action.user.account.code,
                idAccount: action.user.account.id,
            }

        default:
            return state;
    }

}


