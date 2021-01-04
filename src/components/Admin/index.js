import React from 'react'
import { auth } from '../../firebase'
import { Firestore } from '../Firestore'

export const Admin = () => {  
  
  const user = auth ? auth.currentUser : null

  return (
    <div className="container">
      <Firestore user={user} />
    </div>
  )
}
