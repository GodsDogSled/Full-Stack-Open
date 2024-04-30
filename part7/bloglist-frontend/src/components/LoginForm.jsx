import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin, username, password, updateState }) => {

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,

    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid='username'
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid='password'
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <button name="login" type="submit">login</button>
    </form>
  )
}

export default LoginForm