/////////////////////////////////////////////////
// Get contact form component.
// Currently used only on home page.
// But is 100% reusable.
//
// @file:   GetContactForm.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');

var GetContactForm = React.createClass({    
    getInitialState: function() {
        return {
            contactId: '71'
        };
    },
    _onContactIdChange: function(event) {
        this.setState({
            contactId: event.target.value
        });
    },
    _onButtonClick: function(event) {
        this.props.onButtonClick(this.state.contactId);
    },
    render: function() {
        /* jshint ignore:start */
        return (
            <p>
                <input type="number" className="form-control" name="contactId" placeholder="Contact Id" value={ this.state.contactId } onChange={ this._onContactIdChange } style={{width:'150px', display: 'inline-block'}} />
                &nbsp;
                <a className="btn btn-primary btn-md" href="#" role="button" onClick={ this._onButtonClick }>
                    Get Contact Details
                </a>
            </p>
        );
        /* jshint ignore:end */
    }
});

// Line 32, onClick is a native method to pure JavaScript and HTML. _onButtonClick is a locally defined function. 
// Line 23, _onButtonClick, the locally defined function, refers to the function passed from parents, stored in props.
module.exports = GetContactForm;