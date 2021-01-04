import React, { Fragment } from 'react'
import { Header } from '../Header'


export const Layout = ({children, isAuth}) => {
  return (
    <Fragment>
      <Header isAuth={isAuth}/>
        {children}
    </Fragment>
  )
}