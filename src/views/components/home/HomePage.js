/////////////////////////////////////////////////
// Home page component.
//
// @file:   HomePage.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;
var GetContactForm = require('./GetContactForm');
var ContactDetails = require('./ContactDetails');
var StatWidget = require('./widgets/StatWidget');
var HomeStore = require('../../stores/HomeStore');
var HomeActions = require('../../actions/HomeActions');

var HomePage = React.createClass({
    getInitialState: function () {
        return {
            /* jshint ignore:start */
            contactDetails: HomeStore.getContactDetails(),
            newLeads: {
                unit: <span>new leads<br/><br/></span>,
                amount: 3,
                icon: 'sunglasses'
            },
            convertedLeads: {
                unit: <span>new lead conversions<br/></span>,
                amount: 5,
                icon: 'piggy-bank'
            },
            newCases: {
                unit: <span>new cases assigned to me<br/></span>,
                amount: 9,
                icon: 'exclamation-sign'
            },
            teamCases: {
                unit: <span>open case tickets<br/><br/></span>,
                amount: 4,
                icon: 'flash'
            }
            /* jshint ignore:end */
        };
    },

    componentDidMount: function () {
        HomeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        HomeStore.removeListener('change', this._onChange);
    },

    _getContactDetails: function (contactId) {
        HomeActions.getContactById(contactId);
    },

    _onChange: function () {
        var result = HomeStore.getContactDetails();
        // If it's is an error, eg. permission error, add it to ErrorBox
        if (!result.hasOwnProperty('contactId') && result.hasOwnProperty('message')) {
            this.props.updateErrorBox(result.message);
        }
        // Otherwise we have received our expected result;
        // call setState to force a re-render of <ContactDetails>
        else {
            this.props.updateErrorBox([]); // clear the ErrorBox
            this.setState({
                contactDetails: result
            });
        }
    },

    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <div className="jumbotron">
                    <h1>Titan-CRM</h1>
                    <h2>A lightweight CRM application developed by the <Link to="/cp/about">Titan Team</Link></h2>
                </div>
                {/* A row of widgets could be used here; for now they are commented out.
                <div className="row">
                    <StatWidget amount={this.state.newLeads.amount} unit={this.state.newLeads.unit} icon={this.state.newLeads.icon} color="cyan"/>
                    <StatWidget amount={this.state.convertedLeads.amount} unit={this.state.convertedLeads.unit} icon={this.state.convertedLeads.icon} color="green" />
                    <StatWidget amount={this.state.newCases.amount} unit={this.state.newCases.unit} icon={this.state.newCases.icon} color="red" />
                    <StatWidget amount={this.state.teamCases.amount} unit={this.state.teamCases.unit} icon={this.state.teamCases.icon} color="purple" />
                </div> */}

                {/*  A Row of "buttons" (Bootstraps well with custom CSS background-color, wrapped in a Link) */}

                <div className="row">

                    <div className="col-lg-3 col-xs-12">
                        <Link to={ '/cp/leads/my-leads/'} id="homePageLinks">
                            <div className="well" id="homePageLeads">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-coffee fa-4x"></i>
                                    </div>
                                    <div className="col-xs-9">
                                        <h3>My Leads</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-xs-12">
                        <Link to={ '/cp/contacts/my-contacts/'} id="homePageLinks">
                            <div className="well" id="homePageContacts">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-phone fa-4x"></i>
                                    </div>
                                    <div className="col-xs-9">
                                        <h3>My Contacts</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-xs-12">
                        <Link to={ '/cp/accounts/my-accounts/'} id="homePageLinks">
                            <div className="well" id="homePageAccts">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-industry fa-4x"></i>
                                    </div>
                                    <div className="col-xs-9">
                                        <h3>My Accounts</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-xs-12">
                        <Link to={ '/cp/quotes/my-quotes/'} id="homePageLinks">
                            <div className="well" id="homePageQuotes">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-pencil-square fa-4x"></i>
                                    </div>
                                    <div className="col-xs-9">
                                        <h3>My Quotes</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>


            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = HomePage;