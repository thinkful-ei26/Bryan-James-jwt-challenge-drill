import React, { Component } from 'react'
import { connect } from 'react-redux';
import { buttonToggle } from '../actions/auth';
class PopUp extends Component {
  render() {
    return (
      // 
      (this.props.isIdle && this.props.hasAuthToken)? (<div><button onClick={() => {
        this.props.dispatch(buttonToggle());
        // 
      }}>Keep Me Logged In</button></div>) : (<div></div>)
    )
  }
}
const mapStateToProps = (state) => ({
  hasAuthToken: state.auth.authToken !== null,
  isIdle: state.idle.isIdle
});
export default connect(mapStateToProps)(PopUp);
