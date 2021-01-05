import { useCallback } from 'react'
import { db } from '../../firebase';

export const DeleteTask = (tasks, setTasks, handleClose, messageSnackBar) => {

  const deleteFirestore = useCallback(async (id, userId) => {    
    await db.collection(userId).doc(id).delete()
    .then(function() {      
      const arrayFiltrado = tasks.filter(item => item.id !== id)
      setTasks(arrayFiltrado)
      handleClose()
      messageSnackBar("deleted")
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }, [tasks, setTasks, handleClose, messageSnackBar])

  return { deleteFirestore }

}
