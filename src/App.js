import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import newBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setTheBlogs()
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('logged')
    if (logged){
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])

  const setTheBlogs = (async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'logged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`Käyttäjä ${username} kirjautunut`)
      console.log(user)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } catch (exception){
      setErrorMessage('Virheellinen käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
    }
  }

  const logOutHandler = () => {
    window.localStorage.removeItem('logged')
    blogService.removeToken()
    setErrorMessage('Käyttäjä uloskirjautunut')
    setTimeout(() => {
      setErrorMessage('')
    }, 2000)
  }

  const logOutForm = () => (
    <form onSubmit={logOutHandler}>
      <div>
        <button type="submit">logout</button>
      </div>
    </form>
  )

  if (user === null){
    return (
      <div>
        <h2>blogs</h2>
        <Notification message = {errorMessage}/>
        <Toggable buttonLabel='login'>
          <LoginForm
            handleLogin = {handleLogin}
            username = {username}
            password = {password}
            passwordHandler = {({ target }) => setPassword(target.value)}
            usernameHandler = {({ target }) => setUsername(target.value)}/>
        </Toggable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {errorMessage}/>
      <div>
        <p>{user.name} logged in </p>
        {logOutForm()}
        {newBlogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username}/>
      )}
    </div>
  )
}

export default App