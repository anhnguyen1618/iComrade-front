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
    this.cancelCreate = this.cancelCreate.bind(this)
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
  	this.setState({showInput: !this.state.showInput, bufferValue: ''})
  }

  cancelCreate() {
    this.setState({showInput: !this.state.showInput, bufferValue: ''})
  }

  render() {
  	const { showInput, bufferValue } = this.state
    const inputContainerClassNames = classnames({"input-container": true,"long-input": showInput}) 
    return (
      <div className="form-container">
      	<div className={inputContainerClassNames}>
      		<input type="text" onChange={this.updateBufferValue} value={bufferValue} className="input-create"/>
      	</div>

        
        <img 
          className={classnames({"create-button": true, "create-button-disabled": showInput && !bufferValue})}
          onClick={showInput? this.createRoom :this.toggleInput}
          src={ showInput ? 'https://i.imgur.com/WnJq5mB.png' :'https://i.imgur.com/Bxea7FJ.png' } alt=""/>

        { showInput && <img onClick={this.cancelCreate} className="cancel-button" src="https://i.imgur.com/05NMSEj.png"/>}

      </div>
    );
  }
}

export default CreateButton
