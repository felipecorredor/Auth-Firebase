import React, { useEffect, useState, Fragment } from 'react';
import { useForm } from "react-hook-form";
import { Form } from './Form';
import { ArrayList } from './ArrayList';
// SACKBAR
import { SnackBar } from '../widgets/SnackBar';
// MODAL
import { ModalUI } from '../widgets/ModalUI';
// TYPOGRAPHY
import Typography from '@material-ui/core/Typography';
// FIREBASE
import { db } from '../../firebase';
// HOOKS CRUD
import { CreateTask } from '../hooks/CreateTask';
import { EditTask } from '../hooks/EditTask';
import { DeleteTask } from '../hooks/DeleteTask';

export const Firestore = ({user}) => {

  // REACT-HOOK-FORM TO VALIDATE INPUTS
  const { register, handleSubmit, errors, reset } = useForm();

  // INIT STATES
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(false)
  const [field, setField] = useState({})    

  // SACKBAR
  const [openSnack, setOpenSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');

  // MODAL
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null)    

  // CUSTOM HOOKS
  const { create } = CreateTask(tasks, setTasks, ((message) => messageSnackBar(message)))
  const { editFirestore } = EditTask(tasks, setTasks, ((message) => messageSnackBar(message)), (() => createButton()))
  const { deleteFirestore } = DeleteTask(tasks, setTasks, (() => handleClose()), ((message) => messageSnackBar(message)))

  // CALL TO API AND GET DATA OF FIRESTORE
  useEffect(() => {
    const fetchData = async () => {      
      await db.collection(user.uid).get()
      .then(querySnapshot => {      
        const arrayData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
        setTasks(arrayData)             
      })
      .catch(err => {
        console.log('error', err)
      });
    }
    fetchData()
  }, [user.uid])

  // ONSUBMIT HOOK FORM
  const onSubmit = (data, e) => edit ? editFirestore(user.uid, data, field.id, e) : create(user.uid, data, e)  

  // PUSH IN STATE TO EDIT O ADD NEW DATA
  const editData = async task => {
    setEdit(true)    
    setField(task) 
  }  

  // PUSH IN SATTE TO KNOW IF EDIT OR CREATE AND CLEAR INPUT
  const createButton = () => {
    setEdit(false)
    setField({ })
  }

  const handleCloseSnack = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };  
  
  const messageSnackBar = (message) => {    
    setMessageInfo(`Document successfully ${message}!`)
    setOpenSnack(true);
  }  

  const handleOpen = (id) => {
    setOpen(true);
    setIdDelete(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>          
      <div className="container mt-3">      
        <div className="row">      
          <div className="col-md-6">     
            <h3>Your list!</h3>     
            {tasks.length === 0 ?
              <Typography variant="h6" component="h2" gutterBottom>
                Without tasks
              </Typography>
            :
            <ul className="list-group">              
              <ArrayList tasks={tasks}                          
                         editData={editData} 
                         handleOpen={handleOpen} />         
            </ul>
            }
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <h3 style={{width: '100%'}}>{ edit ? 'Edit Task' : 'Add Task' }</h3>
              <button className="float-rigth btn btn-primary" onClick={createButton}>Create</button>
            </div>        
            <Form reset={reset}
                  field={field}
                  edit={edit}                
                  register={register} 
                  handleSubmit={handleSubmit(onSubmit)}
                  errors={errors} />                  
          </div>        
        </div>
      </div>  

      <SnackBar openSnack={openSnack} 
                messageInfo={messageInfo} 
                handleCloseSnack={handleCloseSnack}/>

      <ModalUI idDelete={idDelete}
               userId={user.uid}
               handleClose={handleClose} 
               open={open} 
               deleteFirestore={deleteFirestore}  />               
      
    </Fragment>
  )
}
