import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { describe } from 'vitest'

describe("<NewBlogForm>", () => {


  test('form calls the event handler it received as props with the right details when a new blog is created', () => {
    async () => {
      const createBlogPost = vi.fn()
      const user = userEvent.setup()

      render(
        <NewBlogForm createBlogPost={createBlogPost} />
      )

      const title = screen.getByPlaceholderText('Title here...')
      const author = screen.getByPlaceholderText('Author here...')
      const url = screen.getByPlaceholderText('url here...')
      const sendButton = screen.getByText('Post')

      userEvent.type(title, "Test title")
      userEvent.type(author, "Test author")
      userEvent.type(url, "Test url")
      userEvent.click(sendButton)

      expect(createBlogPost.mock.calls).toHaveLength(1)
      expect(createBlogPost.mock.calls[0][0].content).toBe('Title here...')
      expect(createBlogPost.mock.calls[0][1].content).toBe('Author here...')
      expect(createBlogPost.mock.calls[0][2].content).toBe('url here...')
    }
  })

})