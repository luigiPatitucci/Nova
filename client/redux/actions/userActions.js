import axios from 'axios';
export const ADD_USER = "ADD_USER";



export function createUser(user){

    return function(dispatch){
      
        return axios.post("https://localhost:3000/user/",user,
        /* {headers:{'accept':'application/json','content-type':'application/json'}} */)
        .then(resp=>{
            console.log('SOY LA RESPUESTA', resp)
            dispatch({
                type:ADD_USER,
                user:resp.data
            })
        })
        .catch(err=>{
            console.log('Soy el error', err)
        })
    }
}