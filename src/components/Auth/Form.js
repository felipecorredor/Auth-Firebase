import React from 'react'

export const Form = ({ handleSubmit, register, errors, setIsRegister, isRegister }) => {
  return (
    <form onSubmit={handleSubmit}>
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
          placeholder="Ingrese Email" />
          {errors.email && <span role="alert">{errors.email.message}</span>}

      <input type="password" 
              ref={register({
                required: "required",
                minLength: { value: 5, message: "min length is 5" }
              })}
          name="password"
          className="form-control mb-2"
          placeholder="Ingrese Contraseña" />   
          {errors.password && <span role="alert">{errors.password.message}</span>}
     
      <p style={{ cursor: 'pointer' }} className="text-dark" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '¿Ya estas registrado?' : '¿No tienes cuenta?'}  
      </p>

      <button className="btn btn-dark btn-lg btn-block" style={{ width: '100%' }} type="submit" >
        {isRegister ? 'Registrarse' : 'Acceder'} 
      </button>      
    </form>
  )
}
