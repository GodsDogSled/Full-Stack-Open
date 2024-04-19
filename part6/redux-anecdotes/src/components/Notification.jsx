import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(({ notification }) => {
    return notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {notif ?
        <div style={style}>
          {notif}
        </div>
        :
        null
      }
    </>
  )
}

export default Notification