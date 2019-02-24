import React from 'react'
import Notification from '../components/Notification'

const NewBlogForm = ({ message, newBlogHandler, blogname, blogauthor, blogurl }) => (
  <div>
    <Notification message ={message}/>
    <form onSubmit={newBlogHandler}>
      <div>
        <div>
              title: <input {...blogname}/>
        </div>
        <div>
              author: <input {...blogauthor}/>
        </div>
        <div>
              url: <input {...blogurl}/>
        </div>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
)

export default NewBlogForm