import React, {useState} from "react";
import {User, Lock} from 'react-feather';
import Layout from './Layout';
import ModalDialog from '../components/ModalDialog';
import CreateAccountModalContent from '../fragments/CreateAccountModalContent';

import "./css/Login.css";
import CharacterModalContent from "../fragments/CharacterModalContent";

function Login () {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [loginSuccesfull, setLoginSuccesfull] = useState(false);

    //Envia los datos del usuario para ser verificados y obtener el token
    async function handdleLogin(e){
        e.preventDefault();
        let url = `http://localhost:7000/login/iniciarSesion`;
        const data = {
            username: username,
            password: password
        }

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response=> response.json())
            .then(result => {
                if (result.token){
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('userData', result.userData);
                    setLoginSuccesfull(true);
                } else {
                    setErrorMessage(result.message);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function newRecordHandle(){
        $('#newCreateAccount').modal();
    }

    async function onSaveHandle(isNew){
        var objectData = {};

        let url = `http://localhost:7000/login/register`;
        let characterCrudForm = document.getElementById('newAccountForm');
        let formData = new FormData(characterCrudForm);

        formData.forEach(function(value, key){
            objectData[key] = value;
        });

        if (objectData.password && objectData.confirmPassword && objectData.username){
            if (objectData.password === objectData.confirmPassword){
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objectData)
                })
                    .then(response=> response.json())
                    .then(result => {
                        onCancelHandle();

                        setAlertMsg(result.message);
                        $('#alertModal').modal();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                setAlertMsg('Las claves no coinciden');
                $('#alertModal').modal();
            }
        } else {
            setAlertMsg('Debe llenar todos los campos');
            $('#alertModal').modal();
        }

    }

    function onCancelHandle(){
        $('#newCreateAccount').modal('hide');
    }

    return(
        <>{ loginSuccesfull ? <Layout/> :
            <div className="container">
                <img src="./../../static/img/rym_logo-50pcnt.svg" alt="logo" className="logo" />
                <>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</>
                <form>
                    <label><User />Usuario</label>
                    <input onChange={(event)=>{setUsername(event.target.value)}} type="text"/>
                    <label><Lock />Contraseña</label>
                    <input onChange={(event)=>{setPassword(event.target.value)}} type="password"/>
                    <button type="submit" onClick={handdleLogin}>Iniciar sesión</button>
                </form>

                <button onClick={newRecordHandle}>Crear cuenta</button>

                <ModalDialog
                    onSaveHandle={onSaveHandle}
                    onCancelHandle={onCancelHandle}

                    title={`Crear cuenta`}
                    id='newCreateAccount'
                    entity='account'
                    actions={['save','cancel']}
                    isNew={true}
                >
                    {
                        <CreateAccountModalContent
                            isWritable={true}
                            isNew={true}
                        />
                    }
                </ModalDialog>

                <ModalDialog
                    maxwidth='30vw'
                    id='alertModal'
                >
                    {alertMsg}
                </ModalDialog>
            </div>


        }</>
    );
}

export default Login;