import React from 'react';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form'
import classnames from 'classnames'

import LoginForm from '../presentation/LoginForm.jsx'
import { login, signUp } from '../../redux/api'

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	activeTab: 'Login'
    }

    this.changeActiveTab = this.changeActiveTab.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  changeActiveTab(activeTab) {
  	if (activeTab !== this.state.activeTab) {
  		this.props.clearForm()
  		this.setState({...this.state, activeTab});
  	}
  }

  onSave(user) {
  	console.log(user);
	  if (this.state.activeTab === "Login") {
	    return this.props.logIn(user)
	      .then(() => {
	      	// redirect user here
	      	console.log('done');
	      })
	      .catch(err => {
	      	console.log(err);
	        throw new SubmissionError({ _error: 'Login failed!' })
	      })
	  }
	  return this.props.signUp(user)
	    .then(() => {
	      this.changeActiveTab('Login')
	      alert("Account created successfully!")
	    })
	    .catch(err => {
	      console.log(err);
	      throw new SubmissionError({ _error: 'This user is already exist!' })
	    })
  }

  render() {
  	const { activeTab } = this.state

    return (
      <div className="full-screen">
			  <div className="login-modal">
			  	<div className="login-tab">
			  		{['Login', 'Sign Up'].map(tab => {
			  			const tabClassNames = classnames('tab-header', { 'tab-active': tab === activeTab})
			  			return (<div key={tab} className={tabClassNames} onClick={() => this.changeActiveTab(tab)}>{tab}</div>)
			  		})}
			  	</div>
			    <LoginForm onSubmit={this.onSave} activeTab={activeTab}/>
			  </div>
			</div>  	
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: user => dispatch(login(user)),
    signUp: user => dispatch(signUp(user)),
    clearForm: () => dispatch(reset('login-form'))
  }
}

export default connect(
  null,
  mapDispatchToProps
) (Login)


