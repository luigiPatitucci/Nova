import { RECHARGE} from '../actions/userActions.js';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {  
    title: null,
    description: "",
    transactionType:"",
    amount: 0,
    refernece: "",
    currency: "",
    createdAt: "",
    income:0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECHARGE:
            return {
                ...state,
                title: action.transaction.title,
                description: action.transaction.description,
                transactionType: action.transaction.transactionType,
                amount: action.transaction.amount,
                refernece: action.transaction.refernece,
                currency: action.transaction.currency,
                createdAt: action.transaction.createdAt,
                income: state.income + action.transaction.amount
            }

        default:
            return state;
    }

}


