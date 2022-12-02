import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {


  test('renders content', () => {
    const mockHandler = jest.fn()

    const author = {
      username: 'michael37',
      name: 'Michael Chan',
      id: '5a425ba71b54a676234d17f9'
    }

    const user = {
      name: 'Michael Chan'
    }

    const blog = {
      title: 'Test Blog Entry written',
      author: author,
      likes : 0,
      url: 'www.test.de'
    }
    const container = render(<Blog blog={blog} user={user} likes={mockHandler}/>).container


    const element = screen.getAllByText('Test Blog Entry written', { exact: false })[0]

    expect(element).toHaveTextContent(
      'Test Blog Entry written'
    )
    expect(element).toHaveTextContent(
      'Michael Chan'
    )
    expect(element).not.toHaveTextContent(
      0
    )
    expect(element).not.toHaveTextContent(
      'www.test.de'
    )
  })

  test('clicking the button makes likes and url visible', async () => {
    const mockHandler = jest.fn()

    const author = {
      username: 'michael37',
      name: 'Michael Chan',
      id: '5a425ba71b54a676234d17f9'
    }

    const user1 = {
      name: 'Michael Chan'
    }

    const blog = {
      title: 'Test Blog Entry written',
      author: author,
      likes : 0,
      url: 'www.test.de'
    }
    const container = render(<Blog blog={blog} user={user1} likes={mockHandler}/>).container

    let element = screen.getAllByText('Test Blog Entry written', { exact: false })[0]

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice envokes the button twice', async () => {
    const mockHandler = jest.fn()

    const author = {
      username: 'michael37',
      name: 'Michael Chan',
      id: '5a425ba71b54a676234d17f9'
    }

    const user1 = {
      name: 'Michael Chan'
    }

    const blog = {
      title: 'Test Blog Entry written',
      author: author,
      likes : 0,
      url: 'www.test.de'
    }
    render(<Blog blog={blog} user={user1} like={mockHandler}/>)
    screen.debug()

    let element = screen.getAllByText('Test Blog Entry written', { exact: false })[0]

    const user = userEvent.setup()
    const view_button = screen.getByText('view')
    await user.click(view_button)

    const like_button = screen.getByText('Like')
    await user.click(like_button)
    await user.click(like_button)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})