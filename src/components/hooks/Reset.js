import { useCallback, useState } from 'react'
import { auth } from '../../firebase'

export const Reset = (history) => {
  const [error, setError] = useState(null)

  const reset = useCallback(async data => {
    await auth.sendPasswordResetEmail(data.email)
    .then(function() {      
      console.log("Email sent")
      history.push('/')
    }).catch(function(error) {
      if (error.code === "auth/user-not-found") {
        setError("No hay registro de usuario correspondiente a este correo")
      }
      setError(error.message)
    }); 
    }, [history])

    return { reset, error }
}