import { useCallback, useState } from 'react'
import { db, auth } from '../../firebase';

export const useSetUser = history => {

  const [error, setError] = useState(null)

  const createUser = useCallback(async data => {  
    await auth.createUserWithEmailAndPassword(data.email, data.password)
    .then((res) => {      
      const uid = res.user.uid
      db.collection("users").doc(uid).set({
        email: data.email,
        id: uid
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });  

      db.collection(uid).add({
        name: 'Tarea ejemplo',
        fecha: Date.now()
      })
      .then(function() {
          console.log("Document successfully written2!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });  


      history.push('/admin');
    })
    .catch((error) => {
      if(error.code === 'auth/email-already-in-use'){
        setError('Usuario ya registrado...')
        return
      }
      if(error.code === 'auth/invalid-email'){
          setError('Email no válido')
          return
      }
    });
  }, [history])


  const loginUser = useCallback(async data => {
    auth.signInWithEmailAndPassword(data.email, data.password)
    .then((res) => {
        console.log(res.user)
        history.push('/admin');
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found'){
        setError('El usuario no se encuentra registrado!')
      }      

      if(error.code === 'auth/wrong-password'){
        setError('La contraseña no es valida')
      }      
      
    });
  }, [history])

  return { error, createUser, loginUser }
}



