/////////////////////////////////////////////////
// Create Contact page component.
//
// @file:   UpdateContactPage.js
// @author: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var ReactRouter = require('react-router');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;

var UpdateContactForm = require('./UpdateContactForm');
var ContactsStore = require('../../../stores/ContactsStore');
var ContactsActions = require('../../../actions/ContactsActions');
var CommonStore = require('../../../stores/CommonStore');
var CommonActions = require('../../../actions/CommonActions');
var ErrorBox = require('../../common/ErrorBox');

var UpdateContactPage = React.createClass({
    getInitialState: function () {
        return {
            contactId: this.props.params.id,
            contact: {},
            currencies: [],
            error: null
        };
    },
    componentDidMount: function () {
        ContactsStore.addGetDataListener(this._onGetContact);
        ContactsActions.getContactById(this.state.contactId);
        
        ContactsStore.addPutDataListener(this._onUpdateContact);
        
        CommonStore.addGetAllCurrenciesListener(this._onGetCurrencies);
        CommonActions.getAllCurrencies();
    },
    componentWillUnmount: function () {
        // avoids console error, accompanies function call in componentDidMount
        ContactsStore.removeListener('getData', this._onGetContact);
        CommonStore.removeListener('getAllCurrencies', this._onGetCurrencies);
        ContactsStore.removeListener('putData', this._onUpdateContact);
    },
    setContactState: function (event) {
        var contact = this.state.contact;
        contact[event.target.id] = event.target.value;

        return this.setState({
            contact: contact
        });
    },
    _updateContact: function (event) {
        event.preventDefault();
        ContactsActions.updateContact(this.state.contactId, this.state.contact);
    },
    _onUpdateContact: function (event) {
        var result = ContactsStore.getUpdateRes();
        if (Array.isArray(result)) {
            this.setState({
                 error: result
            });
        } else if (result.hasOwnProperty('message')) {
            this.setState({
                 error: result.message
            });
        } else if (result.hasOwnProperty('rowsUpdated')) {
            this.setState({
                 error: null
            });
            //TODO: redirect to MyContacts
            this.props.router.replace('/cp/contacts/my-contacts');
        } else {
            this.setState({
                 error: 'An unknown error occured.'
            });
        }
    },
    _onGetContact: function (event) {
        return this.setState({
            contact: ContactsStore.gotContact()
        });
    },
    _onGetCurrencies: function (event) {
        return this.setState({
            currencies: CommonStore.getCurrenciesObjArray()
        });
    },
    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <Link to="/cp/contacts/my-contacts" className="btn btn-primary">
                    <span className="fa fa-arrow-left"></span> Back
                </Link>
                <div className="panel panel-default">
                    <div className="panel-heading panel-heading-custom">
                        <h1>Update Contact</h1>
                    </div>
                    <div className="panel-body">
                        <UpdateContactForm
                            contact={ this.state.contact }
                            currencies={ this.state.currencies}
                            onChange={ this.setContactState }
                            onFormSubmit={ this._updateContact }/>
                    </div>
                    <ErrorBox messages={ this.state.error } />
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = withRouter(UpdateContactPage);