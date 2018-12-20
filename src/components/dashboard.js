import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Idle from 'react-idle';
import PopUp from './popup';
import {idleToggle, buttonToggle, clearAuth} from '../actions/auth';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    toggleIdle(){
        console.log("hello");
        // console.log('props.hasAuthToken', props.hasAuthToken)
        console.log('this.props.hasAuthToken', this.props.hasAuthToken)

        this.props.dispatch(idleToggle());
    }
// component life cycle method here for 10 minutes,

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <Idle timeout={240000} onChange={({ idle }) => <h1>
                    { idle ? this.toggleIdle() : undefined}</h1>} />
                    <Idle timeout={300000} onChange={({idle}) => {
                        this.props.dispatch(clearAuth())
                        this.props.dispatch(buttonToggle())
                        }} />
                    <PopUp />
            </div>
        );
    }
}

const mapStateToProps = state => {
    
    const {currentUser} = state.auth;
    console.log(currentUser);
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        isIdle : state.idle.isIdle,
    };
};

// state.auth.currentUser = JohnDoe
// state.auth.(value of ^^ JohnDoe).username

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
