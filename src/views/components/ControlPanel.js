/////////////////////////////////////////////////
// The top-level parent component.
//
// @file:   ControlPanel.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var Cookies = require('js-cookie');
var Header = require('./common/Header');
var ErrorBox = require('./common/ErrorBox');
var Footer = require('./common/Footer');
var $ = require('jquery');

var ControlPanel = React.createClass({
    getInitialState: function () {
        return {
            errorMessages: []
        };
    },
    componentDidMount: function () {
        var thisControlPanel = this;
        this.props.route.onChange = function (prevState, nextState) {
            thisControlPanel._updateErrorBox([]);
        };
    },
    _updateErrorBox: function (messages) {
        // Update the state to force a re-render of <ErrorBox>
        this.setState({
            errorMessages: messages
        });
        // Scroll to the top
        $('html, body').animate({ scrollTop: 0 }, 800);
    },
    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <Header username={ Cookies.get('titanAuthUser') }/>
                <div className="container page-content">
                    <ErrorBox messages={ this.state.errorMessages }/>
                    {this.props.children && React.cloneElement(this.props.children, {
                        updateErrorBox: this._updateErrorBox
                    }) }
                </div>
                {/*<Footer/>*/}
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = ControlPanel;