import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { auth } from '../../firebase';
import { useHistory } from "react-router-dom";

export const Header = ({isAuth}) => {
  const history = useHistory();
  
  const signOut = () => {
    auth.signOut().then(function() {
      history.push('/login');
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">React</Link>
        <div>
          <div className="d-flex">
            <NavLink className="btn btn-dark mr-2" to="/" exact>
                Inicio
            </NavLink>
            <NavLink className="btn btn-dark mr-2" to="/admin">
                Admin
            </NavLink>
            {
              isAuth ? (
                <button onClick={signOut} className="btn btn-dark">
                  Cerrar sesion
                </button>
                 )
                 :
              (
                <NavLink className="btn btn-dark" to="/login">
                    Login
                </NavLink>               
              ) 
            }
          </div>
        </div>
      </div>
    </div>
  )
}
