import React, { useState, useRef } from 'react';

function CreateAccountModalContent({ isWritable, isNew }) {

    return(
        <div  className="container">
            <form id="newAccountForm">
                <label>Usuario</label>
                <input type="text" id="username" name="username" required={true}/>
                <label>Contraseña</label>
                <input type="password" id="password" name="password" required={true}/>
                <label>Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required={true}/>
            </form>
        </div>
    );
}

export default CreateAccountModalContent;