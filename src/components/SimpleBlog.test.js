import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

it('clicking twice calls eventhandler twice', async () => {
  const simpleBlog = {
    title: 'Himon kurvit',
    author: 'Kikka from the past',
    likes: 23,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler}/>
  )

  const btn = getByText('like')
  fireEvent.click(btn)
  fireEvent.click(btn)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('renders content', () => {
  const simpleBlog = {
    title: 'Himon kurvit',
    author: 'Kikka from the past',
    likes: 23,
  }

  const component = render(
    <SimpleBlog blog={simpleBlog}/>
  )

  expect(component.container).toHaveTextContent(
    'Himon kurvit Kikka from the past'
  )

  expect(component.container).toHaveTextContent(
    'blog has 23 likes'
  )

  const taa = component.container.querySelector('.titleAndAuthor')
  expect(taa).toHaveTextContent('Himon kurvit Kikka from the past')
})