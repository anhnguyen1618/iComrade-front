import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCurrentUser } from '../../redux/api'

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	const {getCurrnentUser, router} = this.props;
    getCurrnentUser()
    	.then( _ => {
    		router.push('/dashboard')
    	})
    	.catch( _ => {
    		router.push('/')
    	})
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.hasUser !== this.props.hasUser && !nextProps.hasUser) {
  		this.props.router.push('/')
  	}
  }



  render() {
  	const { router } = this.props
    return (
      <div>
	      {
	      	React.cloneElement(this.props.children, { router })
	      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasUser: !!state.user
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCurrnentUser: () => dispatch(getCurrentUser())
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Main))
