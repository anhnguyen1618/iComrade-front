import React from 'react';
import { shallow } from 'enzyme'
import LoginInput from "../LoginInput";

jest.unmock('../LoginInput.jsx')

describe('Room', () => {
  const props = { 
  	meta: { active: true },
  	input: { name: 'test', value: 'testValue' } 
  }

  let subject = null

  beforeEach(() => {
  	subject = shallow(<LoginInput {...props}/>)
  })

  it('should exist', () => {
    expect(subject).toBeTruthy()
  });

  it('should have focus class', () => {
    expect(subject.find('.focused')).toBeTruthy()
  });
})
