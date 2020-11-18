import axios from 'axios';
export const ADD_USER = "ADD_USER";
export const LOGIN_USER = "LOGIN_USER";



export function createUser(user){

    return function(dispatch){
      
        return axios.post("http://192.168.0.209:3000/user/", user)
        .then(resp=>{
            console.log('SOY LA RESPUESTA', resp.data)
            dispatch({
                type:ADD_USER,
                user:resp.data
            })
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};


export function login (data){

    return function(dispatch){
      
        return axios.post("http://192.168.0.209:3000/auth/login", data)
        .then( resp =>{
            console.log('SOY LA RESPUESTA', resp.data)
            dispatch({
                type:LOGIN_USER,
                user:resp
            })
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    };
};


