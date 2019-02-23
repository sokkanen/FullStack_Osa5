import React from 'react'
import App from './App'
import blogService from './services/blogs'
import { render, waitForElement, fireEvent } from 'react-testing-library'

describe('App', () => {

  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    const enableLoginButton = await waitForElement(
      () => component.getByText('login')
    )
    expect(enableLoginButton).toBeDefined()

    // Kun kirjautuminen painetaan näkyviin, ilmestyy kirjaudu-painike
    fireEvent.click(enableLoginButton)
    const loginButton = await waitForElement(
      () => component.getByText('kirjaudu')
    )
    expect(loginButton).toBeDefined()
    
    // Blogilistan pituus on 0 === lista ei ole näkyvissä
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    const bloglist = component.container.querySelectorAll('.bloglist')
    expect(bloglist.length).toBe(0)

  })

  it('if user is logged, notes are rendered', async () => {
    const user = {
      username: 'testihenkilo',
      token: '123456789',
      name: 'T.E. Staaja'
    }
    window.localStorage.setItem(
      'logged', JSON.stringify(user)
    )
    const component = render(<App />)
    component.rerender(<App />)

    // Blogilistan pituus on 1 === lista on näkyvissä
    const bloglist = component.container.querySelectorAll('.bloglist')
    expect(bloglist.length).toBe(1)
    
    // ..ja listalla on 6 blogia
    await waitForElement(
      () => component.container.querySelectorAll('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(6)

  })
})
