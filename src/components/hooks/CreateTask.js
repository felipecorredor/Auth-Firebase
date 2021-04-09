import { useCallback } from 'react'
import { db } from '../../firebase'

export const CreateTask = (tasks, setTasks, messageSnackBar) => {

  const create = useCallback(async (userId, data, e) => {      
      await db.collection(userId).add(data)
      .then(function(docRef) {
        messageSnackBar("created")
        setTasks([ ...tasks, {id: docRef.id, ...data } ])
        e.target.reset();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });   
    }, [tasks, setTasks, messageSnackBar])

    return { create }
}
