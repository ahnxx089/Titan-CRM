/////////////////////////////////////////////////
// Update Quote form component.
//
// @file:   UpdateQuoteForm.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var QuoteTypeOption = require('../create-quote/QuoteTypeOption');
var QuoteStatusIdOption = require('../create-quote/QuoteStatusIdOption');
var AccountPartyOption = require('../create-quote/AccountPartyOption');
var CurrencyOption = require('../../common/CurrencyOption');
var NoCurrencyOption = require('../create-quote/NoCurrencyOption');
var ContactPartyOption = require('../create-quote/ContactPartyOption');
var NoContactPartyOption = require('../create-quote/NoContactPartyOption');
var SalesChannelOption = require('../create-quote/SalesChannelOption');
var CommonStore = require('../../../stores/CommonStore');
var CommonActions = require('../../../actions/CommonActions');

var UpdateQuoteForm = React.createClass({

    getInitialState: function () {
        return {
            quoteTypesObjArray: [],
            quoteStatusIdsObjArray: [],
            accountPartiesObjArray: [],
            currenciesObjArray: [],
            contactPartiesObjArray: [],
            salesChannelsObjArray: []
        };
    },

    componentDidMount: function () {
        CommonStore.addGetQuoteTypesListener(this._onGetQuoteTypes);
        CommonStore.addGetQuoteStatusIdsListener(this._onGetQuoteStatusIds);
        CommonStore.addGetAccountPartiesListener(this._onGetAccountParties);
        CommonStore.addGetAllCurrenciesListener(this._onGetCurrencies);
        CommonStore.addGetContactPartiesListener(this._onGetContactParties);
        CommonStore.addGetSalesChannelsListener(this._onGetSalesChannels);
        CommonActions.getQuoteTypes();
        CommonActions.getQuoteStatusIds();
        CommonActions.getAccountParties();
        CommonActions.getAllCurrencies();
        CommonActions.getContactParties();
        CommonActions.getSalesChannels();

        var thisUpdateQuoteForm = this;

        $('#UpdateQuoteForm').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                // Handle the invalid form
            } else {
                // Proceed with form submission if all input data is valid
                thisUpdateQuoteForm.props.onFormSubmit(e);
            }
        });
    },

    componentWillUnmount: function() {
        CommonStore.removeListener('getQuoteTypes', this._onGetQuoteTypes);
        CommonStore.removeListener('getQuoteStatusIds', this._onGetQuoteStatusIds);
        CommonStore.removeListener('getAccountParties', this._onGetAccountParties);
        CommonStore.removeListener('getAllCurrencies', this._onGetCurrencies);
        CommonStore.removeListener('getContactParties', this._onGetContactParties);
        CommonStore.removeListener('getSalesChannels', this._onGetSalesChannels);
    },

    _onGetQuoteTypes: function () { this.setState({ quoteTypesObjArray: CommonStore.getQuoteTypesObjArray() }); },
    _onGetQuoteStatusIds: function () { this.setState({ quoteStatusIdsObjArray: CommonStore.getQuoteStatusIdsObjArray() }); },
    _onGetAccountParties: function () { this.setState({ accountPartiesObjArray: CommonStore.getAccountPartiesObjArray() }); },
    _onGetCurrencies: function () { this.setState({ currenciesObjArray: CommonStore.getCurrenciesObjArray() }); },
    _onGetContactParties: function () { this.setState({ contactPartiesObjArray: CommonStore.getContactPartiesObjArray() }); },
    _onGetSalesChannels: function () { this.setState({ salesChannelsObjArray: CommonStore.getSalesChannelsObjArray() }); },

    render: function () {
        /* jshint ignore:start */

        // make quoteTypeId drop-down menu
        var quoteTypes = this.state.quoteTypesObjArray;
        var quoteTypesJSX = [];
        for (var i = 0; i < quoteTypes.length; i++) {
            quoteTypesJSX.push(<QuoteTypeOption key={ 'quoteType_' + i } quoteType={ quoteTypes[i] }/>);
        }

        // make quoteStatusId drop-down menu
        var quoteStatusIds = this.state.quoteStatusIdsObjArray;
        var quoteStatusIdsJSX = [];
        for (var i = 0; i < quoteStatusIds.length; i++) {
            quoteStatusIdsJSX.push(<QuoteStatusIdOption key={ 'quoteStatusId_' + i } quoteStatusId={ quoteStatusIds[i] }/>);
        }

        // make AccountPartyId drop-down menu  -- these are the rows generated by query:
        // SELECT party_role.party_id FROM party_role WHERE role_type_id = 'ACCOUNT';
        var accountParties = this.state.accountPartiesObjArray;
        var accountPartiesJSX = [];
        var noAccountParty = { party_id: null };
        accountPartiesJSX.push(<AccountPartyOption key={ 'accountParty_' } accountParty={ noAccountParty }/>);
        for (var i = 0; i < accountParties.length; i++) {
            accountPartiesJSX.push(<AccountPartyOption key={ 'accountParty_' + i } accountParty={ accountParties[i] }/>);
        }

        // make currency drop-down menu (field is nullable, therefore use NoCurrencyOption for first option)
        var currencies = this.state.currenciesObjArray;
        var currenciesJSX = [];
        var noCurrency = { uom_id: null };
        currenciesJSX.push(<NoCurrencyOption key={ 'currency_' } currency={ noCurrency }/>);
        for (var i = 0; i < currencies.length; i++) {
            currenciesJSX.push(<CurrencyOption key={ 'currency_' + i } currency={ currencies[i] }/>);
        }

        // make ContactPartyId drop-down menu  -- these are the rows generated by query:
        // SELECT party_role.party_id FROM party_role WHERE role_type_id = 'CONTACT';
        // (field is nullable, therefore use NoContactPartyOption for first option)
        var contactParties = this.state.contactPartiesObjArray;
        var contactPartiesJSX = [];
        var noContactParty = { party_id: null };
        contactPartiesJSX.push(<NoContactPartyOption key={ 'contactParty_' } contactParty={ noContactParty }/>);
        for (var i = 0; i < contactParties.length; i++) {
            contactPartiesJSX.push(<ContactPartyOption key={ 'contactParty_' + i } contactParty={ contactParties[i] }/>);
        }

        // make SalesChannelEnumId drop-down menu
        var salesChannels = this.state.salesChannelsObjArray;
        var salesChannelsJSX = [];
        for (var i = 0; i < salesChannels.length; i++) {
            salesChannelsJSX.push(<SalesChannelOption key={ 'salesChannel_' + i } salesChannel={ salesChannels[i] }/>);
        }

        // for displaying UT initialValidFromDate more readably & deal with null case
        var initialValidFromDate = this.props.initialValidFromDate;
        initialValidFromDate = (initialValidFromDate === null ? 'none' : new Date(initialValidFromDate).toDateString() );

        // for displaying UT initialValidThruDate more readably & deal with null case
        var initialValidThruDate = this.props.initialValidThruDate;
        initialValidThruDate = (initialValidThruDate === null ? 'none' : new Date(initialValidThruDate).toDateString() );

        // for displaying UT initialIssueDate more readably & deal with null case
        var initialIssueDate = this.props.initialIssueDate;
        initialIssueDate = (initialIssueDate === null ? 'none' : new Date(initialIssueDate).toDateString() );

        return (
            <div>
                <form id="UpdateQuoteForm">

                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="quoteTypeId">Quote Type</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="quoteTypeId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.quoteTypeId }>
                                        { quoteTypesJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="AccountPartyId">Account Party Id</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="partyId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.partyId }>
                                        { accountPartiesJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="currency">Currency</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-usd" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="currencyUomId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.currencyUomId }>
                                        { currenciesJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="ContactPartyId">Contact Party Id</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="contactPartyId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.contactPartyId }>
                                        { contactPartiesJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="salesChannel">Sales Channel</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="salesChannelEnumId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.salesChannelEnumId }>
                                        { salesChannelsJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="quoteName">Quote Name</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        id="quoteName"
                                        placeholder="Factory Parts"
                                        pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                        data-error="(max length 100 characters)"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.quoteName } />
                                    </div>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="validFromDate">Valid From Date (currently {initialValidFromDate})</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <input type="date"
                                        className="form-control"
                                        id="validFromDate"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.validFromDate }/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="validThruDate">Valid Thru Date (currently {initialValidThruDate})</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <input type="date"
                                        className="form-control"
                                        id="validThruDate"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.validThruDate }/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="issueDate">Issue Date (currently {initialIssueDate})</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <input type="date"
                                        className="form-control"
                                        id="issueDate"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.issueDate }/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="statusId">Status ID</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select
                                        className="form-control"
                                        id="statusId"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.statusId }>
                                        { quoteStatusIdsJSX }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                         <div className="col-lg-12 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="(255 characters or less)"
                                        pattern="^[\x20-\x7E\u00C0-\u00FC]{1,255}$"
                                        data-error="(max length 255 characters)"
                                        onChange={ this.props.onChange }
                                        value={ this.props.quote.description } />
                                    </div>
                            <div className="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>

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

module.exports = UpdateQuoteForm;