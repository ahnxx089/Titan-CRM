/////////////////////////////////////////////////
// Contact Details component.
// Currently used only on home page. + LeadDetailPage
// But is 100% reusable.
//
// @file:   ContactDetails.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');

var ContactDetails = React.createClass({    
    render: function() {
        /* jshint ignore:start */
        var contact = this.props.contact;
        
        return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Contact Details</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">Party Id</span>&nbsp;
                            { contact.partyId }
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">Party Type</span>&nbsp;
                            { contact.partyTypeId }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">First Name</span>&nbsp;
                            { contact.salutation + ' ' + contact.firstName + ' ' + contact.middleName }
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">Last Name</span>&nbsp;
                            { contact.lastName }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">Created By</span>&nbsp;
                            { contact.createdBy }
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <span className="label label-default">Created Date</span>&nbsp;
                            { contact.createdDate }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-lg-12">
                            <span className="label label-default">Description</span>&nbsp;
                            { contact.description }
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = ContactDetails;