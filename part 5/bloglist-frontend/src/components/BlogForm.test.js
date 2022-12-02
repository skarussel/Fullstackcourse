import BlogForm from './BlogForm'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('<BlogForm />', () => {
  test('EventHandler is called with right details', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    const title = 'Neuer Eintrag'
    const author = 'Petra Pan'
    const url = 'www.test.de'

    render(<BlogForm addBlog={mockHandler} />)
    screen.debug()
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('Create')

    await user.type(inputs[0], title)
    await user.type(inputs[1], author)
    await user.type(inputs[2], url)
    await user.click(sendButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(title)
    expect(mockHandler.mock.calls[0][0].author).toBe(author)
    expect(mockHandler.mock.calls[0][0].url).toBe(url)

  })


})