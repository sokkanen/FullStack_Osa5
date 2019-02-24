import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        Käyttäjätunnus:
        <input {...username}/>
      </div>
      <div>
        Salasana:
        <input {...password}/>
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )
}

export default LoginForm