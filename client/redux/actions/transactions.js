import axios from 'axios';

export const RECHARGE = 'RECHARGE'; 
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

const API_URL ="192.168.1.12:3000"

export function recharge(transaction){

    return function(dispatch){
      
        return axios.post(`http://${API_URL}/transaction/recharge`, transaction)
        .then(resp=>{
             dispatch({
                type:RECHARGE,
                transaction:resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR AL RECARGAR', err)
        })
    };
};


export function getTransactions(userId){

    return function(dispatch){
      
        return axios.get(`http://${API_URL}/transaction/getTransaction/${userId}`)
        .then(resp=>{
            console.log('SOY LAS TRANSACCIONES', resp.data)
             dispatch({
                type: GET_TRANSACTIONS,
                transactions: resp.data
            }) 
        })
        .catch(err=>{
            console.log('ERROR EN TRAER EL HISTORIAL DE TRANSACCIONES', err)
        })
    };
};