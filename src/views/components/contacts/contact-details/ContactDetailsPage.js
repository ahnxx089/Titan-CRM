/////////////////////////////////////////////////
// Create Contact page component.
//
// @file:   ContactDetailsPage.js
// @author: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var ReactRouter = require('react-router');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var ContactMechTable = require('../../common/ContactMechTable');
var ContactsStore = require('../../../stores/ContactsStore');
var ContactsActions = require('../../../actions/ContactsActions');

var ContactDetailPage = React.createClass({
    getInitialState: function () {
        return {
            contactId: this.props.params.id,
            contact: {},
            types: [],
            purposeTypes: [],
            accounts: [],
            case: []
        };
    },
    componentDidMount: function () {
        //get contact
        ContactsStore.addGetDataListener(this._onGetContact);
        ContactsActions.getContactById(this.state.contactId);
        
        //get accounts
        
        //get cases
        
    },
    componentWillUnmount: function () {
        ContactsStore.removeListener('getData', this._onGetContact);
        CommonStore.removeListener('getContactMechTypes', this._onGetTypes);
        CommonStore.removeListener('getContactMechPurposeTypes', this._onGetPurposeTypes);
    },
    _onGetContact: function (event) {
        return this.setState({
            contact: ContactsStore.gotContact()
        });
    },
    render: function () {
        var contact = this.state.contact;
        var contactMechs = contact.contactMechs || [];
        
        /* jshint ignore:start */
        return (
            <div>
                <Link to="/cp/contacts/my-contacts" className="btn btn-primary">
                    <span className="fa fa-arrow-left"></span> Back
                </Link>
                <div className="panel panel-default">
                    <div className="panel-heading panel-heading-custom">
                        <h1>View Contact</h1>
                    </div>
                                 
                                 
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Contact</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Salutation</span>&nbsp;
                                    { contact.salutation }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Last Name</span>&nbsp;
                                    { contact.lastName }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">First Nmae</span>&nbsp;
                                    { contact.firstName }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Middle Name</span>&nbsp;
                                    { contact.middleName }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Preferred Currency</span>&nbsp;
                                    { contact.preferredCurrencyUomId }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Birth Date</span>&nbsp;
                                    { contact.birthDate }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Status</span>&nbsp;
                                    { contact.statusId }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Created By</span>&nbsp;
                                    { contact.createdBy }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Created Date</span>&nbsp;
                                    { contact.createdDate }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Updated Date</span>&nbsp;
                                    { contact.updatedDate }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-12">
                                    <span className="label label-default">Comments</span>&nbsp;
                                    { contact.comments }
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
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Contact Information</h3>
                        </div>
                        <ContactMechTable contactMechs={ contactMechs } />
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Accounts</h3>
                        </div>
                        <table id="AccountsTable" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Account Name</th>
                                    <th>Site Name</th>
                                    <th>Parent ID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Cases</h3>
                        </div>
                        <table id="contactsTable" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>???</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = withRouter(ContactDetailPage);