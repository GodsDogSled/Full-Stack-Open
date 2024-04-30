import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe } from 'vitest'

describe("<Blog>", () => {
  const blog = {
    title: 'Component testing test',
    author: "FullstackOpen",
    url: "alfkj",
    likes: 10,
    user: {
      username: 'Billiam',
      name: "Bill William"
    }
  }

  test('Blog post only displays Title and Author on initial render', () => {

    render(
      <Blog blog={blog} />
    )

    const title = screen.getByText('Component testing test')
    const author = screen.getByText('-FullstackOpen')
    const div = document.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
    expect(author).toBeDefined()
    expect(title).toBeDefined()
  })

  test('clicking the show details reveals likes and url', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('View Details')
    await user.click(button)
    const div = document.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like function called twice', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )
    const user = userEvent.setup()
    const button = screen.getByText('View Details')
    await user.click(button)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

