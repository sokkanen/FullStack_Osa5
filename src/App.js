import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useField from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [blogname, setBlogname] = useState('')
  const [blogauthor, setBlogauthor] = useState('')
  const [blogurl, setBlogUrl] = useState('')
  const [message, setMessage] = useState('')
  const username = useField('text')
  const password = useField('password')

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
      const user = await loginService.login(username.value, password.value)
      console.log(user)
      window.localStorage.setItem(
        'logged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage(`Käyttäjä ${username.value} kirjautunut`)
      console.log(user)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } catch (exception){
      username.reset()
      password.reset()
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

  const newBlogHandler = async (event) => {
    event.preventDefault()
    const blog = {
      'title': blogname,
      'author': blogauthor,
      'url': blogurl,
      'likes': 0
    }
    try {
      const b = await blogService.create(blog)
      console.log(b)
      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (error) {
      setMessage(`Virhe uuden blogin luomisessa: ${error.message}`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }

  if (user === null){
    return (
      <div>
        <h2>blogs</h2>
        <Notification message = {errorMessage}/>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin = {handleLogin}
            username = {username}
            password = {password}/>
        </Togglable>
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
        <NewBlogForm
          message = {message}
          newBlogHandler = {newBlogHandler}
          blogname = {blogname}
          blogauthor = {blogauthor}
          blogurl = {blogurl}
          blogauthorHandler = {({ target }) => setBlogauthor(target.value)}
          blognameHandler = {({ target }) => setBlogname(target.value)}
          blogurlHandler = {({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <div className="bloglist">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} username={user.username}/>
        )}
      </div>
    </div>
  )
}

export default App