import React, {useState} from "react";
import {LogOut} from 'react-feather';

import "./css/MenuBar.css";

function MenuBar({ title }) {
    const [userData, setUserData] = useState(localStorage.getItem('userData'));

    async function handleLogout(e) {
        e.preventDefault();
        await localStorage.removeItem('token');
        await localStorage.removeItem('userData');

        window.location.href = '/';
    }

  return (
    <nav className="MenuBar navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <legend className="text-white mb-0">{title}</legend>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          { userData }
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                          <a className="dropdown-item" onClick={handleLogout}> <LogOut/> Cerrar Sesión</a>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
  );
}

export default MenuBar;
