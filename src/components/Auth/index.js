import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Form } from './Form';
import { useHistory } from "react-router-dom";
import { useSetUser } from '../hooks/useSetUser';

export const Auth = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [isRegister, setIsRegister] = useState(true)
  
  const { error, createUser, loginUser } = useSetUser(history)

  const onSubmit = data => isRegister ? createUser(data) : loginUser(data)

  return (    
    <div className="mt-5">
      <h3 className="text-center">
        {isRegister ? 'Registro de usuarios' : 'Login de acceso'}
      </h3>
      <hr/>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-xl-4">
            {error &&
              <h4>{error}</h4>
            }
            <Form handleSubmit={handleSubmit(onSubmit)} 
                  register={register} 
                  errors={errors} 
                  isRegister={isRegister}
                  setIsRegister={setIsRegister}/>
          </div>
        </div>
      </div>
  )
}
