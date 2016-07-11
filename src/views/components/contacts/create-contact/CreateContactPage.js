/////////////////////////////////////////////////
// Create Contact page component.
//
// @file:   CreateContactPage.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var withRouter = require('react-router').withRouter;

var AddContactForm = require('./AddContactForm');
var ContactsStore = require('../../../stores/ContactsStore');
var ContactsActions = require('../../../actions/ContactsActions');

var CreateContactPage = React.createClass({

    getInitialState: function() {
        return {
            contact: {
                        partyTypeId: 'PERSON',
                        preferredCurrencyUomId: '',
                        description: '',
                        statusId: 'PARTY_ENABLED',
                        createdBy: '',
                        salutation: '',
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        birthDate: '',
                        comments: '',
                        emailAddress: '',
                        webAddress: '',
                        countryCode: '',
                        areaCode: '',
                        contactNumber: '',
                        askForName: '',
                        toName: '',
                        attnName: '',
                        address1: '',
                        address2: '',
                        directions: '',
                        city: '',
                        stateProvinceGeoId: '',
                        zipOrPostalCode: '',
                        countryGeoId: ''
                    },
            addedContactPartyId: ''
        };
    },

    componentDidMount: function() {
        // register with Store as a listener for emit of new party_id of the added Contact
        ContactsStore.addedContactListener(this._onAddedContact);
    },

    componentWillUnmount: function() {
        // make sure to stop listening before unmounting, so that if/when mounted again
        // in the future, not adding more and more listeners . . .
        ContactsStore.removeListener('change', this._onAddedContact);
    },

    setContactState: function(event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.contact[ field ] = value;
        this.setState( {contact: this.state.contact} );
    },

    _addContact: function(event) {
        event.preventDefault();
        ContactsActions.addContact(this.state.contact); // start the Flux unidirectional flow!
    },

    _onAddedContact: function() {

        // After a successful ajax call in the store, calling ContactsStore.addedContact() will return
        // one of the three results from contactApi.addContact, handle with if-else-if-else block
        var result = ContactsStore.addedContact();

        // User lacks security permission to addContact
        if (result.hasOwnProperty('message'))
        {
            this.props.updateErrorBox(result.message);
        }
        // User has permission, but there were one or more validation errors
        else if (Object.prototype.toString.call(result) === '[object Array]')
        {
            this.props.updateErrorBox(result);
        }
        // User had permission and no validation errors-- api should return the new partyId.
        // Note:  the new partyId won't actually get rendered on this page, but I still want
        // it to reach here for diagnostic purposes and to really prove we closed the loop.
        else if (result.hasOwnProperty('partyId')) {
            this.setState({
                addedContactPartyId: result.partyId
            });
            // for successful post to database, redirect to MyContactsPage
            this.props.router.replace('/cp/contacts/my-contacts');
        }
    },

    render: function (){

        /* jshint ignore:start */
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading panel-heading-custom">
                        <h1>Create Contact</h1>
                    </div>
                    <div className="panel-body">
                        <AddContactForm
                            contact={ this.state.contact }
                            onChange={ this.setContactState }
                            onFormSubmit={ this._addContact } />
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

// when doing the usual module.exports, wrap CreateContactPage in with.router in order to have
// property this.props.router.replace to do the redirect to MyContactsPage upon submitting form data
module.exports = withRouter(CreateContactPage);