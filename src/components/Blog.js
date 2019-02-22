import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username }) => {

  const [visible, setVisible] = useState(false)
  const hide = {display: visible ? 'none' : ''}
  const show = {display: visible ? '' : 'none'}

  const toggleVis = () => {
      setVisible(!visible)
  }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 3
  }

  const likeHandler = () => {
    blog.likes = blog.likes + 1
    blogService.update(blog.id, blog)
  }

  const removeHandler = () => {
    blogService.remove(blog.id)
  }

  const removeButton = () => {
    if (username === blog.user.username){
      return (
        <div>
          <button onClick={removeHandler}>remove</button>
        </div>
      )
    }
    return (
      <div>
      </div>
    )
  }

  return (
  <div style={blogStyle}>
  <div style={show} onClick={toggleVis}>
    <div>
    {blog.title} by {blog.author}
    </div>
    <div>
    <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
    {blog.likes} likes <button onClick={likeHandler}>like</button>
    </div>
    <div>
    added by {blog.user.name}
    </div>
    {removeButton()}
  </div>
  <div style={hide} onClick={toggleVis}>
    <div>
    {blog.title} by {blog.author}
    </div>
    </div>
  </div>
  )
}

export default Blog