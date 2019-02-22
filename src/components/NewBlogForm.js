import React, {useState} from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

const newBlogForm = () => {
    const [blogname, setBlogname] = useState("")
    const [blogauthor, setBlogauthor] = useState("")
    const [blogurl, setBlogurl] = useState("")
    const [message, setMessage] = useState('')

    const newBlogHandler = async (event) => {
        event.preventDefault()
        const blog = {
            "title": blogname,
            "author": blogauthor,
            "url": blogurl,
            "likes": 0
        }
        try {const b = await blogService.create(blog)
        console.log(b)
        setMessage(`A new blog ${blog.title} by ${blog.author} added`)
        setTimeout(() => {
            setMessage('')
          }, 4000);
        } catch (error) {
            setMessage(`Virhe uuden blogin luomisessa: ${error.message}`)
            setTimeout(() => {
                setMessage('')
              }, 4000);
        }
    }

    return (
            <div>
                <Notification message ={message}/>
            <form onSubmit={newBlogHandler}>
                <div>
                <div>
                title: <input type="text" value={blogname} name="Blogname" onChange={({target}) => setBlogname(target.value)}/>
                </div>
                <div>
                author: <input type="text" value={blogauthor} name="Blogauthor" onChange={({target}) => setBlogauthor(target.value)}/>
                </div>
                <div>
                url: <input type="text" value={blogurl} name="BlogURL" onChange={({target}) => setBlogurl(target.value)}/>
                </div>
                <button type="submit">Create</button>
                </div>
            </form>
            </div>
    )
}

export default newBlogForm