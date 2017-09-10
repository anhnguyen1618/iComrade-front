import React from 'react';
import classnames from 'classnames';

import { CREATE_ROOM } from '../../constants/action'

class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
    	showInput: false,
    	bufferValue: ''
    }

    this.toggleInput = this.toggleInput.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.updateBufferValue = this.updateBufferValue.bind(this)

  }

  toggleInput() {
  	this.setState({...this.state, showInput: !this.state.showInput})
  }

  updateBufferValue(e) {
  	this.setState({...this.state, bufferValue: e.target.value})
  }

  createRoom() {
  	const { emitRoomAction } = this.props
  	if (this.state.bufferValue) {
  		emitRoomAction(CREATE_ROOM, this.state.bufferValue)
  	}
  	this.toggleInput()
  	this.setState({...this.state, bufferValue: ''})
  }

  render() {
  	const { showInput, bufferValue } = this.state
    const inputContainerClassNames = classnames({"input-container": true,"long-input": showInput}) 
    return (
      <div className="form-container">
      	<div className={inputContainerClassNames}>
      		<input type="text" onChange={this.updateBufferValue} className="input-create"/>
      	</div>
      	<button
      		className="btn btn-success" 
      		disabled={ showInput && !bufferValue}
      		onClick={showInput? this.createRoom :this.toggleInput}>
      		{showInput ? 'Submit' : 'Create'}
      	</button>
      </div>
    );
  }
}

export default CreateButton
