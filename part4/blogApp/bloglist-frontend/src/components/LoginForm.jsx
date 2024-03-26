
const LoginForm = ({ handleLogin, username, password, updateState }) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm