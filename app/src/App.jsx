import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import openSocket from 'socket.io-client'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null
    this.state = { currentNumber : -1, rooms: []};

    this.bookRoom = this.bookRoom.bind(this);
    this.cancel = this.cancel.bind(this);
    this.finish = this.finish.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:8000', { query: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWI0MzY3ZjE4ZTI4NzJmMTRjMDZmNGUiLCJ1c2VybmFtZSI6Inpvem8iLCJfX3YiOjAsImNyZWF0ZWRfYXQiOiIyMDE3LTA5LTA5VDE4OjQ0OjE1LjI2MFoiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTA0OTg4NjEzLCJleHAiOjE1MDQ5OTA0MTN9.wlKpxC8FaUKS96DZ_GynHvxCkJSKEqGH4IvIP1Gq7Ys'});
    this.socket = socket;
    socket.on('BOOK_ROOM', number => {
      this.setState({ currentNumber: number})
    });

    socket.on('FINISH_ROOM', () => {
      const { currentNumber } = this.state
      if (currentNumber >= 0) {
        this.setState({currentNumber : currentNumber - 1 })
      }
    });

    socket.on('CANCEL_ROOM', () => {
      console.log('hehe');
      this.setState({currentNumber : -1 })
    });

    socket.on('UPDATE_ROOM_INFO', data => {
      console.log(data);
      const rooms = Object.keys(data).map(key => ({roomName: key, number : data[key]}))
      console.log(rooms);
      this.setState({...this.state, rooms})
    });

    socket.emit('GET_ROOM')
  }

  getStatus(currentNumber) {
    switch (currentNumber) {
      case -1:
        return 'Havenot book!'
      case 0:
        return 'RUN'
      default:
        return currentNumber
    }
  }

  bookRoom(roomName) {
    this.socket.emit('BOOK_ROOM', roomName)
  }

  cancel(roomName) {
    this.socket.emit('CANCEL_ROOM', roomName);
  }

  finish(roomName) {
    this.socket.emit('FINISH_ROOM', roomName);
  }

  createRoom() {
    console.log(this.state.roomName);
    this.socket.emit('CREATE_ROOM', this.state.roomName)
  }

  deleteRoom(roomName) {
    this.socket.emit('REMOVE_ROOM', roomName)
  }


  render() {
    const { currentNumber, rooms } = this.state;
    console.log(currentNumber);
    return (
      <div>
        <input onChange={event => this.setState({...this.state, roomName: event.target.value})} />
        <button onClick={this.createRoom}>Create</button>
        
        <h1>
          {this.getStatus(currentNumber)}
        </h1>

        <ul>
          { rooms.map(room => {
            const {roomName, number} = room
            return (
              <li>
                {roomName} : {number}
                { currentNumber === -1 && <button onClick={() => this.bookRoom(roomName)}>Book</button> }
                { currentNumber >= 0 && <button onClick={() => this.cancel(roomName)}>Cancel</button> }

                { currentNumber === 0 && <button onClick={() => this.finish(roomName)}>Finish</button> }

                <button onClick={() => this.deleteRoom(roomName)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App
