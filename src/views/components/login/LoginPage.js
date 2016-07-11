/////////////////////////////////////////////////
// Login page component.
// Logs the user in by verifying credentials
// and storing the auth token in cookies.
//
// @file:   LoginPage.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var withRouter = require('react-router').withRouter;
var Cookies = require('js-cookie');
var LoginStore = require('../../stores/LoginStore');
var LoginActions = require('../../actions/LoginActions');

var LoginPage = React.createClass({
    getInitialState: function() {
        return {
            titanUsername: '',
            titanPassword: '',
            rememberMe: false,
            authToken: '',
            authMessage: ''
        };
    },
    componentDidMount: function() {
        LoginStore.addAuthListener(this._onAuth);
    },
    componentWillUnmount: function() {
        LoginStore.removeListener('auth', this._onAuth);
    },
    _updateState: function(event) {
        var key = event.target.id;
        var value = (event.target.id === 'rememberMe' ? event.target.checked : event.target.value);
        var keysToUpdate = {};
        keysToUpdate[key] = value;
        this.setState(keysToUpdate);
    },
    _onAuth: function() {
        var authData = LoginStore.getAuthData();
        if (authData.success === true) {
            this.setState({ authMessage: authData.message });
            // Save the token in a cookie
            //
            if (this.state.rememberMe === true) {
                // Create cookies that expires after 1 day, which is also
                // the expiration time of token
                Cookies.set('titanAuthToken', authData.token, { expires: 1 });
                Cookies.set('titanAuthUser', this.state.titanUsername, { expires: 1 });
            }
            else {
                // Create session cookies; expire as soon as browser window is closed
                Cookies.set('titanAuthToken', authData.token);
                Cookies.set('titanAuthUser', this.state.titanUsername);
            }
            // Redirect to referring page
            //
            var location = this.props.location;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname);
            }
            else {
                this.props.router.replace('/');
            }
        }
        else {
            this.setState({ authMessage: authData.message });
        }
    },
    _onLoginFormSubmit: function(event) {
        event.preventDefault();
        LoginActions.authenticateUser(this.state.titanUsername, this.state.titanPassword);
    },
    render: function() {
        /* jshint ignore:start */
        return (
            <div className="container">
                <form className="form-signin" onSubmit={ this._onLoginFormSubmit }>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="titanUsername" className="sr-only">Username</label>
                    <input type="text" id="titanUsername" className="form-control" placeholder="Username"
                        onChange={ this._updateState } required autofocus />
                    <label htmlFor="titanPassword" className="sr-only">Password</label>
                    <input type="password" id="titanPassword" className="form-control" placeholder="Password"
                        onChange={ this._updateState } required />
                    <div className="checkbox">
                        <label>
                            <input id="rememberMe" type="checkbox" onChange={ this._updateState } /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <div className="text-center">{ this.state.authMessage }</div>
                </form>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = withRouter(LoginPage);