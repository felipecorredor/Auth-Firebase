import { useCallback }from 'react'
import { db } from '../../firebase'

export const EditTask = (tasks, setTasks, messageSnackBar, createButton) => {

  const editFirestore = useCallback(async (userId, data, id, e) => {
    await db.collection(userId).doc(id).update(data)
    .then(function() {      
      messageSnackBar("updated")      
      const arrayEditado = tasks.map(item => ( item.id === id ? {id: item.id, ...data} : item ))
      setTasks(arrayEditado)
      createButton()
      e.target.reset();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });   
  }, [tasks, setTasks, messageSnackBar, createButton])

  return { editFirestore }
}
