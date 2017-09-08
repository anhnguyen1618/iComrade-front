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
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:8000');
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
      console.log('hehe');
      const rooms = Object.keys(data).map(key => ({roomName: key, number : data[key]}))
      this.setState({...this.state, rooms})
    });
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

  bookRoom() {
    // const { roomName } = this.state;
    const roomName = 'Toilet';
    this.socket.emit('BOOK_ROOM', roomName)
  }

  cancel() {
    this.socket.emit('CANCEL_ROOM', "Toilet");
  }

  finish() {
    this.socket.emit('FINISH_ROOM', "Toilet");
  }


  render() {
    const { currentNumber, rooms } = this.state;
    console.log(currentNumber);
    return (
      <div>
        <input onChange={roomName => this.setState({...this.state, roomName})} />
        { currentNumber === -1 && <button onClick={this.bookRoom}>Book</button> }
        { currentNumber >= 0 && <button onClick={this.cancel}>Cancel</button> }

        { currentNumber === 0 && <button onClick={this.finish}>Finish</button> }
        <h1>
          {this.getStatus(currentNumber)}
        </h1>

        <ul>
          { rooms.map(room => {
            return (
              <li>{room.roomName} : {room.number}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App
