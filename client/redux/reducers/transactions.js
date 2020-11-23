import { RECHARGE } from '../actions/transactions';
import { GET_TRANSACTIONS } from '../actions/transactions';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {  
    title: null,
    description: "",
    transactionType:"",
    amount: 0,
    refernece: "",
    currency: "",
    createdAt: "",
    income: 0,
    transactionHistory: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECHARGE:
            return {
                ...state,
                description: action.transaction.description,
                transactionType: action.transaction.transactionType,
                amount: action.transaction.amount,
                refernece: action.transaction.refernece,
                currency: action.transaction.currency,
                createdAt: action.transaction.createdAt,
                income: state.income + action.transaction.amount
            }
        case GET_TRANSACTIONS: 
            console.log('EN EL REDUCER', action.transactions)
            return {
                ...state,
                transactionHistory: action.transactions
            }

        default:
            return state;
    }

}


