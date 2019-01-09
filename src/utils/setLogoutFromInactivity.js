import { store } from '../redux/store'
import { logout } from '../redux/ducks/auth'

export default () => {
  this.lastActiveTime = new Date()

  window.onclick = () => {
    this.lastActiveTime = new Date()
  }
  window.onmousemove = () => {
    this.lastActiveTime = new Date()
  }
  window.onkeypress = () => {
    this.lastActiveTime = new Date()
  }
  window.onscroll = () => {
    this.lastActiveTime = new Date()
  }

  const checkIdleTime = () => {
    // returns idle time every 10 seconds
    let dateNowTime = new Date().getTime()
    let lastActiveTime = new Date(this.lastActiveTime).getTime()
    // converting from milliseconds to seconds
    let remTime = Math.floor((dateNowTime - lastActiveTime) / 1000)
    // console.log('Idle since ' + remTime + ' Seconds Last active at ' + this.lastActiveTime)

    const token = window.localStorage.getItem('xcllusiveJWT')

    if (token && remTime > 30) {
      store.dispatch(logout('You were disconnected for inactivity.'))
      this.lastActiveTime = new Date()
    }
  }

  window.setInterval(checkIdleTime, 10000)
}
