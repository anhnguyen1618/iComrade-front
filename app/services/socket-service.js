import openSocket from 'socket.io-client'

const URL = 'http://localhost:8000'

let _instance = null;
class SocketService {
  socket = null;
  constructor() {
    if (!instance) {
      _instance = this;
      this.initializeSocket();
      this._eventNames = [];
    }

    return _instance
  }

  initializeSocket() {
    this.socket = openSocket(URL, { query: 'token=TOKEN_HERE'});
  }

  addSocketEventHanler(eventName, hanlder) {

    if (this._eventNames.includes(eventName)) {
      console.warn("This event has been registered");
      return;
    }
    this._eventNames.push(eventName)

    this.socket.on(keyword, hanlder)
  }

  emitEvent(eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  getEventNames() {
    return this._eventNames
  }
}

export default SocketService;
