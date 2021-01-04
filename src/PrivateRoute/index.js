import React, { useEffect } from 'react'
import {Route, Redirect } from 'react-router-dom'
import { auth } from '../firebase'

export const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render = {() => 
        auth.currentUser ?
          <Component />  
        :
          <Redirect to="/login" />
      }   
    />  
  )
}
