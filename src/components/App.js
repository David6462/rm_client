import React from 'react';

import Layout from './Layout';
import Login from './Login';

import './css/App.css';

//Funcion para decodificar el token
function parseJwt(token){
    if (token){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else {
        return 0;
    }

}

let isUserLogged = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());

function App(){
    function checkBD(){
        
    }

    return (
        <>{ isUserLogged ? <Layout/> : <Login/> }</>
    )
}

export default App;