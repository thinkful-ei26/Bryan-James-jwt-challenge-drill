import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Idle from 'react-idle';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import { refreshAuthToken, idleToggle, clearAuth, buttonToggle } from '../actions/auth';
import PopUp from './popup';


export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
            // let isIdle = false;
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 10 * 1000 // One hour changed to 10 minutes
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }
        // Some stuff I can start driving
        clearInterval(this.refreshInterval);
    }

    // toggleIdle() {
    //     console.log(this.props);
    //     // let isIdle = false;
    //     this.props.isIdle = !props.isIdle;
    // }
   
    
    render() {
        return (
            <div className="app">
                <HeaderBar />

                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
                
            </div>
        );
        // (<div>our notice modal and button goes here :</div>)
        // Only display div if this. 
    }
}
// 240,000 = 4 minutes in seconds
const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    isIdle : state.idle.isIdle
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
