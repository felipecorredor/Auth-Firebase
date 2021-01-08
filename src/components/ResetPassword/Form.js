import React from 'react'

export const Form = ({ handleSubmit, register, errors, history }) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
        <input type="email" 
              ref={register({
                required: "required",
                pattern: {                  
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Entered value does not match email format"
                }
              })}
          name="email"
          className="form-control mb-2"
          placeholder="Ingrese Email Recuperacion" />
          {errors.email && <span role="alert">{errors.email.message}</span>}

        <p style={{ cursor: 'pointer' }} className="text-dark" onClick={() => history.push('/login')}>
          Volver al inicio
        </p>

        <button className="btn btn-dark btn-lg btn-block" style={{ width: '100%' }} type="submit">
          Recuperar Contraseña
        </button>
    </form>
  )
}
