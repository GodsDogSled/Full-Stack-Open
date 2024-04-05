import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin, username, password, updateState }) => {

  LoginForm.propTypes = {
    handlezLogin: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
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