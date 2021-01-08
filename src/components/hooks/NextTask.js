import { useCallback } from 'react'
import { db } from '../../firebase'

export const NextTask = (ultimo, tasks, setTasks, setUltimo, setDesactivar) => {  
  const next = useCallback(async (uid) => {    
    await db.collection(uid)
    .limit(1)
    .startAfter(ultimo)
    .get()
    .then(querySnapshot => {
      const arrayData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))      
      setTasks([...tasks, ...arrayData])
      setUltimo(querySnapshot.docs[querySnapshot.docs.length - 1] )

      const query = db.collection(uid)
      .limit(1)
      .startAfter(querySnapshot.docs[querySnapshot.docs.length - 1])
      .get()
      if (query.empty) {
        setDesactivar(true)
      } else {
        setDesactivar(false)
      }
    })
    .catch(err => {
      console.log('error', err)
    });
    }, [ultimo, tasks, setTasks, setUltimo, setDesactivar])

    return { next }
}
