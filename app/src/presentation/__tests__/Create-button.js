import React from 'react';
import { shallow } from 'enzyme'
import CreateButton from "../Create-button";

jest.unmock('../Create-button.jsx')

describe('Room', () => {
  let subject = null

  beforeEach(() => {
  	subject = shallow(<CreateButton/>)
  })

  it('should exist', () => {
    expect(subject).toBeTruthy()
  });

  it('should not show input by default', () => {
    const node = subject.find('.create-button')
    expect(node.length).toBeTruthy()
    expect(subject.find('.long-input').length).toBeFalsy()
  });

  it('should disable create button when showing input', () => {
    const node = subject.find('.create-button')
    expect(subject.find('.create-button-disabled').length).toBeFalsy()
    node.simulate('click')
    expect(subject.find('.create-button-disabled').length).toBeTruthy()
  })

  it('should show input form when clicking create button', () => {
    const node = subject.find('.create-button')
    expect(subject.find('.long-input').length).toBeFalsy()
    node.simulate('click')
    expect(subject.find('.long-input').length).toBeTruthy()
  });

})
