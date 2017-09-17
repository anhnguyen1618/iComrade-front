import openSocket from 'socket.io-client'

const URL = 'http://localhost:8000'

let _instance;
class SocketService {
  socket = null;
  constructor() {
    if (!_instance) {
      _instance = this;
      this.initializeSocket();
      this._eventNames = [];
    }

    return _instance
  }

  initializeSocket() {
    console.log('token',localStorage.getItem('token') );
    this.socket = openSocket(URL, { query: `token=${localStorage.getItem('token')}`});
  }

  addSocketEventHanler(eventName, hanlder) {

    if (this._eventNames.includes(eventName)) {
      console.warn("This event has been registered");
      return;
    }
    this._eventNames.push(eventName)

    this.socket.on(eventName, hanlder)
  }

  emitEvent(eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  getEventNames() {
    return this._eventNames
  }
}

export default SocketService;
