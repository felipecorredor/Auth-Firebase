import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Reset } from '../hooks/Reset';
import { Form } from './Form';

export const ResetPassword = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const { reset, error } = Reset(history)

  const onSubmit = data => reset(data)

  return (
    <div className="mt-5">
      <h3 className="text-center">
        Recupera tu contraseña!
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
                  history={history} />
          </div>
        </div>
      </div>
  )
}
