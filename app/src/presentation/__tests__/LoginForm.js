import React from 'react';
import { shallow } from 'enzyme'
import { LoginForm } from "../LoginForm";

jest.unmock('../LoginForm.jsx')

describe('LoginForm', () => {
  let subject = null
  beforeEach(() => {
  	subject = shallow(<LoginForm activeTab={"Login"}/>)
  })

  it('should exist', () => {
    expect(subject).toBeTruthy()
  });

  it('should show login-logo when activeTab is Login', () => {
  	expect(subject.find('.signup-logo').length).toBe(0)
    expect(subject.find('.login-logo').length).toBe(1)
    expect(subject.find('.btn').text()).toBe('Login')
  });

  it('should show login-logo when activeTab is Login', () => {
  	const subject = shallow(<LoginForm activeTab={"SignUp"}/>)
    expect(subject.find('.login-logo').length).toBe(0)
    expect(subject.find('.signup-logo').length).toBe(1)
    expect(subject.find('.btn').text()).toBe('SignUp')
  });

  it('should show error message when there is error', () => {
  	const subject = shallow(<LoginForm activeTab={"SignUp"} error={"errorText"}/>)
    expect(subject.find('.error-message').length).toBe(1)
    expect(subject.find('.error-message strong').text()).toBe("errorText")
  });
})