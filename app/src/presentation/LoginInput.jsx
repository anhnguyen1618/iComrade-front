import React from 'react';
import classnames from 'classnames'

const LoginControledInput = (props) => {
  const { meta: { active }, input: { name, value } } = props
  const className = classnames("form-group", name, { "focused": active || value })
  return (
    <div className={className}>
	   	<input 
	   		className="form-control"
	   		{...props.input}
	   		type={name==="password"?"password":"text"}		   		
	   		/>
	</div>
  )
}

export default LoginControledInput