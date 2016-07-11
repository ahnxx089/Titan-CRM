/////////////////////////////////////////////////
// Find Contacts page component
//
// @file:   FindContactsPage.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var SearchForm = require('./SearchForm');
var ContactRowWithPhone = require('./ContactRowWithPhone');
var ContactsStore = require('../../../stores/ContactsStore');
var ContactsActions = require('../../../actions/ContactsActions');

var FindContactsPage = React.createClass({

    /* Each type of search gets a separate state:
        "Find By ID #" --> idField.partyId
        "Find By Name" --> nameField.firstName, nameField.lastName
        "Find By Phone Number" --> phoneField.contactNumber, phoneField.countryCode, phoneField.AreaCode
    */
    getInitialState: function () {
        return {
            idField: { partyId: '' },
            nameField: { firstName: '', lastName: '' },
            phoneField: { contactNumber: '', countryCode: '', areaCode: '' },
            contactsFound: null
        };
    },

    componentDidMount: function () {
        ContactsStore.addGetDataListener(this._onGetById);
        ContactsStore.addGetByIdentityListener(this._onGetByIdentity);
        ContactsStore.addGetByPhoneNumberListener(this._onGetByPhoneNumber);
    },

    componentWillUnmount: function () {
        ContactsStore.removeListener('getData', this._onGetById);
        ContactsStore.removeListener('getByIdentity', this._onGetByIdentity);
        ContactsStore.removeListener('getByPhoneNumber', this._onGetByPhoneNumber);
    },

    // saves numbers typed in "Find By ID #" and resets other states to empty
    setIdFieldState: function (event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.idField[field] = value;
        this.setState({ idField: this.state.idField });
        this.setState({ nameField: { firstName: '', lastName: '' } });
        this.setState({ phoneField: { contactNumber: '', countryCode: '', areaCode: '' } });
    },

    // saves strings typed in "Find By Name" and resets other states to empty
    setNameFieldState: function (event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.nameField[field] = value;
        this.setState({ nameField: this.state.nameField });
        this.setState({ idField: { partyId: '' } });
        this.setState({ phoneField: { contactNumber: '', countryCode: '', areaCode: '' } });
    },

    // saves strings typed in "Find By Phone Number" and resets other states to empty
    setPhoneFieldState: function (event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.phoneField[field] = value;
        this.setState({ phoneField: this.state.phoneField });
        this.setState({ idField: { partyId: '' } });
        this.setState({ nameField: { firstName: '', lastName: '' } });
    },

    _resetForm: function (event) {
        this.setState({
            idField: { partyId: '' },
            nameField: { firstName: '', lastName: '' },
            phoneField: { contactNumber: '', countryCode: '', areaCode: '' },
            contactsFound: null
        });
    },

    // setXxxXxxState functions above ensure this function receives only one
    // non-zero-length string, so only one Action is initiated
    _findContacts: function (event) {
        event.preventDefault();

        var partyId = this.state.idField.partyId;

        var firstName = this.state.nameField.firstName;
        var lastName = this.state.nameField.lastName;
        var identity = {
            firstName: firstName,
            lastName: lastName
        };

        var contactNumber = this.state.phoneField.contactNumber;
        var countryCode = this.state.phoneField.countryCode;
        var areaCode = this.state.phoneField.areaCode;
        var phoneNumber = {
            contactNumber: contactNumber,
            countryCode: countryCode,
            areaCode: areaCode
        };

        if (partyId.length > 0){
            ContactsActions.getContactById(partyId);
        }
        if ( (firstName.length > 0) || (lastName.length > 0) ) {
            ContactsActions.getContactsByIdentity(identity);
        }
        if ( (contactNumber.length > 0) || (countryCode.length > 0) || (areaCode.length > 0) ) {
            ContactsActions.getContactsByPhoneNumber(phoneNumber);
        }
    },

    _onGetById: function () {
        this.setState({
            contactsFound: ContactsStore.gotContact()
        });
    },

    _onGetByIdentity: function () {
        this.setState({
            contactsFound: ContactsStore.getByIdentity()
        });
    },

    _onGetByPhoneNumber: function () {
        this.setState({
            contactsFound: ContactsStore.getByPhoneNumber()
        });
    },

    render: function () {

        /* jshint ignore:start */

        var contacts = this.state.contactsFound;
        var contactsJSX = [];

        // for a result from initiating action ContactsActions.getContactById(partyId)
        if ( Object.prototype.toString.call(contacts) === '[object Object]' ){
            // when search by Id turns up no result, the returned object lacks a partyId,
            // so this prevents an empty row from rendering
            if (contacts.hasOwnProperty('partyId')){
                contactsJSX.push(<ContactRowWithPhone key={ 'contact_0' } contact={ contacts }/>);
            }
        }
// Note from Lucas & Dukjin: possible conflicting key when i=0. (no big deal though)
// Consider removing i++ in loop def, and writing <... contact={ contacts[i]} key={ 'contact_' + ++i } /> in the push. (not verified)
        // for a result from initiating action ContactsActions.getContactsByIdentity(identity)
        //  or a result from initiating action ContactsActions.getContactsByPhoneNumber(phoneNumber)
        if ( Object.prototype.toString.call(contacts) === '[object Array]' ){
            for (var i = 0; i < contacts.length; i++) {
                contactsJSX.push(<ContactRowWithPhone key={ 'contact_' + i } contact={ contacts[i]}/>);
            }
        }

        return (
            <div>
                <div className="container">

                    {/* First panel: holds Search Form */}
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h1>Find Contacts</h1>
                        </div>
                        <div className="panel-body">
                            <SearchForm
                                idField={ this.state.idField }
                                nameField={ this.state.nameField }
                                phoneField={ this.state.phoneField }
                                onIdFieldChange={ this.setIdFieldState }
                                onNameFieldChange={ this.setNameFieldState }
                                onPhoneFieldChange={ this.setPhoneFieldState }
                                onFormSubmit={ this._findContacts }
                                onFormReset={ this._resetForm } />
                        </div>
                    </div>

                    {/* Second panel:  holds Table with results */}
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h2>Contact List</h2>
                        </div>
                        <div className="panel-body">
                            <table id="findContactsTable" className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Salutation</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Country Code</th>
                                        <th>Area Code</th>
                                        <th>Phone Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { contactsJSX }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = FindContactsPage;