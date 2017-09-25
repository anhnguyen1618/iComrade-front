import React from 'react';
import { shallow } from 'enzyme'
import Room from "../Room";

jest.unmock('../Room.jsx')

describe('Room', () => {

	const emitRoomAction = jest.fn()
  const props = { 
  	roomName: 'test', 
  	numberOfPeopleInUse: 2, 
  	queueNumber: 2, 
  	emitRoomAction
  }

  let subject = null

  beforeEach(() => {
  	subject = shallow(<Room {...props}/>)
  })

  it('should exist', () => {
    expect(subject).toBeTruthy()
  });

  it('should have room name', () => {
  	const node = subject.find('.room-name')
    expect(node.length).toBeTruthy()
    expect(node.text()).toBe('test')
  });

  it('should not have .btn-book when queueNumber === -1', () => {
  	const node = subject.find('.btn-book')
    expect(node.length).toBeFalsy()
  });

  it('should have button cancel when queueNumber !== -1', () => {
  	const node = subject.find('.btn-warning')
    expect(node.length).toBeTruthy()
  });

  it('should emit roomAction cancel when clicking cancel button', () => {
  	const node = subject.find('.btn-warning')
  	node.simulate('click')
  	expect(emitRoomAction.mock.calls.length).toBe(1);
  	expect(emitRoomAction.mock.calls[0][0]).toBe('CANCEL_ROOM')
  	expect(emitRoomAction.mock.calls[0][1]).toBe('test')
  });

  it('should emit roomAction cancel when clicking cancel button', () => {
  	const emitRoomAction = jest.fn()
  	const props = { 
	  	roomName: 'test', 
	  	numberOfPeopleInUse: 2, 
	  	queueNumber: -1, 
	  	emitRoomAction
	  }

  	const subject = shallow(<Room {...props}/>)
  	const node = subject.find('.btn-book')

  	node.simulate('click')

  	expect(emitRoomAction.mock.calls.length).toBe(1);
  	expect(emitRoomAction.mock.calls[0][0]).toBe('BOOK_ROOM')
  	expect(emitRoomAction.mock.calls[0][1]).toBe('test')
  });

})