import React from 'react'

const LoginForm = ({ handleLogin, username, password, passwordHandler, usernameHandler }) => (
  <form onSubmit={handleLogin}>
    <div>
      Käyttäjätunnus:
      <input type="text" value={username} name="Username" onChange={usernameHandler}/>
    </div>
    <div>
      Salasana:
      <input type="password" value={password} name="Password" onChange={passwordHandler}/>
    </div>
    <button type="submit">kirjaudu</button>
  </form>
)

export default LoginForm