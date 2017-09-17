import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCurrentUser } from '../../redux/api'
import { getUrgentRooms } from '../../redux/selectors'

import Notification from './Notification.jsx'

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
    const { hasUser, router } = this.props
  	if (nextProps.hasUser !== hasUser && !nextProps.hasUser) {
  		router.push('/')
  	}
  }

  render() {
  	const { router, notificationIsShown } = this.props
    return (
      <div>
        <div className={notificationIsShown && "main-content"}>
          {
            React.cloneElement(this.props.children, { router })
  	      }
        </div>
        { notificationIsShown && <Notification/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasUser: !!state.user,
    notificationIsShown: state.notificationIsShown
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
