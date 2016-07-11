/////////////////////////////////////////////////
// A button for submitting the Create Account form
// 
//
// @file:   SubmitButton.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var SubmitButton = React.createClass({
    getInitialState: {},
    
    render: function () {
        /* jshint ignore: start */
        return (
            <div className='form-group'>
                <label className='col-md-4 control-label' htmlFor='createAccount'>Create Account</label>
                <div className='col-md-4'>
                    <button id='createAccount' name='createAccount' className='btn btn-primary'>Submit</button>
                </div>
            </div>
        );
        /* jshint ignore: end */
    }
    
});

module.exports = SubmitButton;