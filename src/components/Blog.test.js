import React from 'react'
import { render } from 'react-testing-library'
import Blog from './Blog'

const blog = {
  title: 'Himon kurvit',
  author: 'Kikka from the past',
  url: 'http://www.sukkulavenukseen.fi',
  likes: 0,
  user: {
    username: 'Jalmarsson',
    name: 'Jalmarsson'
  }
}

test('renders hidden content as intended === hidden', () => {
  const component = render(
    <Blog blog={blog} username="Jalmarsson"/>
  )

  const hidden = component.container.querySelector('.hidden')
  expect(hidden).toHaveTextContent(
    'Himon kurvit by Kikka from the past'
  )
  expect(hidden).not.toHaveTextContent(
    'http://www.sukkulavenukseen.fi'
  )

  expect(hidden).not.toHaveTextContent(
    'added by Jalmarsson'
  )
})

test('renders visible content as intended === visible', () => {
  const component = render(
    <Blog blog={blog} username="Jalmarsson"/>
  )

  const visible = component.container.querySelector('.visible')
  expect(visible).toHaveTextContent(
    'Himon kurvit by Kikka from the past'
  )

  expect(visible).toHaveTextContent(
    'http://www.sukkulavenukseen.fi'
  )

  expect(visible).toHaveTextContent(
    'added by Jalmarsson'
  )
})