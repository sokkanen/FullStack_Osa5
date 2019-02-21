import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('Virheellinen käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      Käyttäjätunnus: 
      <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
    </div>
    <div>
      Salasana: 
      <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
    </div>
    <button type="submit">kirjaudu</button>
  </form>
  )

  const newBlogForm = () => (
    <div>
      not implemented
    </div>
  )

  return (
    <div>
          <Notification message = {errorMessage}/>
          
          
          {user === null ? 
          loginForm() :
          <div>
            <p>{user.name} logged in </p>
            {newBlogForm()}
          </div>
          }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App