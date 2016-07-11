/////////////////////////////////////////////////
// Add Contact form component.
//
// @file:   AddContactForm.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var AddPersonalInfo = require('./AddPersonalInfo');
var AddContactMech = require('../../common/AddContactMech');

var AddContactForm = React.createClass({

    componentDidMount: function () {
        var thisAddContactForm = this;

        // NOTE: to get bootstrap validator working, this jQuery statement to attach .on('submit',...)
        // must come after the the validations are enabled on the form (down in its children)
        // Therefore it is placed here inside componentDidMount so that the form is rendered first.
        $('#addContactForm').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                // Handle the invalid form
            } else {
                // Proceed with form submission if all input data is valid
                thisAddContactForm.props.onFormSubmit(e);
            }
        });
        // for further explanation see:  http://www.ofssam.com/forums/showthread.php?tid=64
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <form id="addContactForm">
                    <AddPersonalInfo
                        contact={ this.props.contact }
                        onChange={ this.props.onChange } />
                    <AddContactMech
                        contact={ this.props.contact }
                        onChange={ this.props.onChange } />
                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-primary" type="submit" data-disable="true">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = AddContactForm;