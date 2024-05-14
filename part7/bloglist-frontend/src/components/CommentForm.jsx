import React from 'react'


const CommentForm = () => {
  return (

    <form onSubmit={null}>
      <div>
        Comment
        <input
          type="text"
          name="Comment"
          data-testid='comment'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Comment here'
        />
      </div>
      <button type="submit">Post</button>
    </form>

  )
}

export default CommentForm