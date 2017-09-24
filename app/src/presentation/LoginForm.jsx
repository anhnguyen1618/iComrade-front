import React from 'react';
import { Field, reduxForm } from 'redux-form'

import LoginInput from './LoginInput.jsx'

const LoginForm = ({handleSubmit, activeTab, error, submitting}) => {
	return (
		<form className="form" onSubmit={handleSubmit}>
    	<center>
    	{ activeTab === 'Login'
    		?<img src="http://www.computer-repairs-auckland.co.nz/images/home_with_wifi.png" alt=""/>
	    	: <img src="http://i.imgur.com/8XZaKyN.png" alt=""/>
	    }
    	</center>
    	{error && <center className="error-message"><strong>{error}</strong></center>}
    	<Field name="username" component={LoginInput}/>
      	<Field name="password" component={LoginInput}/>
      	<button className="pull-right waves-effect waves-light btn" type="submit" disabled={submitting}>{activeTab}</button>
    </form>
	)
}

export default reduxForm({ form: 'login-form' })(LoginForm)
