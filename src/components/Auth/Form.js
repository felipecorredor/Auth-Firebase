import React from 'react'

export const Form = ({ handleSubmit, register, errors, setIsRegister, isRegister, history }) => {
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
     
     
        <div className="row">
          <div className="col-md-6">
            <p style={{ cursor: 'pointer' }} className="text-dark" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? '¿Ya estas registrado?' : '¿No tienes cuenta?'}  
            </p>
          </div>

          <div className="col-md-6">
            { !isRegister &&
              <p style={{ cursor: 'pointer' }} className="text-dark text-end" onClick={() => history.push('/reset-password')}>
                Recuperar contraseña
              </p>
            }  
          </div>
        </div>     

      <button className="btn btn-dark btn-lg btn-block" style={{ width: '100%' }} type="submit" >
        {isRegister ? 'Registrarse' : 'Acceder'} 
      </button>

    </form>
  )
}
