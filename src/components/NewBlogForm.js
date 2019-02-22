import React from 'react'
import Notification from '../components/Notification'

const NewBlogForm = ({ message, newBlogHandler, blogname, blogauthor, blogurl, blogauthorHandler, blognameHandler, blogurlHandler }) => (
  <div>
    <Notification message ={message}/>
    <form onSubmit={newBlogHandler}>
      <div>
        <div>
              title: <input type="text" value={blogname} name="Blogname" onChange={blognameHandler}/>
        </div>
        <div>
              author: <input type="text" value={blogauthor} name="Blogauthor" onChange={blogauthorHandler}/>
        </div>
        <div>
              url: <input type="text" value={blogurl} name="BlogURL" onChange={blogurlHandler}/>
        </div>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
)

export default NewBlogForm