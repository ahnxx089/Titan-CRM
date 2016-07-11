/////////////////////////////////////////////////
// The main React component for rendering the
// Create Account page.
//
//
// @file:   CreateAccountPage.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////
var React = require('react');
var withRouter = require('react-router').withRouter;
var AccountsStore = require('../../../stores/AccountsStore');
var AccountsActions = require('../../../actions/AccountsActions');


var AccountForm = require('./AccountForm');
var CreateAccountPage = React.createClass({

    getInitialState: function () {
        return ({
            emptyAccount: {
                partyId: '',
                orgName: '',
                parentPartyId: '',
                statusId: 'PARTY_ENABLED',
                companyName: '',
                officeSiteName: '',
                preferredCurrencyUomId: '',
                annualRevenue: '',
                numEmployees: '',
                industryEnumId: '',
                ownershipEnumId: '',
                comments: '',
                tickerSymbol: '',
                importantNote: '',
                description: '',//TODO: Add in an input field for this
                logoImgURL: '',
                contactMech: '' //TODO: Replace with what people are using to initialize contact mech fields
            },
            addedAccountPartyId: '',
            dirty: false
        });
    },

    setAccountState: function (event) {
        var accField = event.target.id;
        var newValue = event.target.value;
        this.state.emptyAccount[accField] = newValue;
        this.setState({
            emptyAccount: this.state.emptyAccount
        });
    },

    componentDidMount: function () {
        AccountsStore.addAddedAccountListener(this._onAddedAccount);
    },

    componentWillUnmount: function () {
        AccountsStore.removeListener('change', this._onAddedAccount);
    },

    _onAddAccount: function (e) {
        e.preventDefault();
        AccountsActions.addAccount(this.state.emptyAccount);
    },

    _onAddedAccount: function () {
        var newId = AccountsStore.getAddedAccountId();
        /*Here we take care of handling the three possible results from
        addAccount in the API: a user authentication/authorization error, 
        a validation error, and the desired partyId of the newly created acccount. */
        if (newId.hasOwnProperty('message')) {
            this.props.updateErrorBox(newId.message);
        }
        else if (Object.prototype.toString.call(newId) === '[object Array]') {
            this.props.updateErrorBox(newId);
        }
        else if (newId.hasOwnProperty('partyId')) {
           this.setState({
               addedAccountPartyId: newId
            });
            //When the data has been successfully written to the database and the API
            //has returned an A-OK message, we end by redirecting the user to their My Accounts page
            this.props.router.replace('/cp/accounts/my-accounts');
        }
        
    },

    render: function () {
        /* jshint ignore: start */
        return (
            <div className="container">

                {/* Form For Account Creation */}

                <legend>New Account</legend>

                <div className="row">
                    <div className="col-md-8 col-lg-12 col-md-offset-2 col-lg-offset-1">
            {/*<AccountForm /> */}
 
                        <AccountForm account={this.state.emptyAccount} onChange={this.setAccountState} onFormSubmit={this._onAddAccount} />
                        
                    </div>
                </div>

            </div>
        );
        /* jshint ignore:end */
    }


});

module.exports = withRouter(CreateAccountPage);