import React, {useState} from 'react'
import Toggable from './Toggable'

const Blog = ({ blog }) => {

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
    {blog.likes} likes <button>like</button>
    </div>
    <div>
    added by {blog.user.name}
    </div>
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