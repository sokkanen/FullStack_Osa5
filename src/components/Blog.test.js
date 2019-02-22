import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
    title: 'Himon kurvit',
    author: 'Kikka from the past',
    url: 'http://www.sukkulavenukseen.fi',
    likes: 0,
    user: {
    name: 'Jalmarsson'
    }
    }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Himon kurvit by Kikka from the past'
  )
})