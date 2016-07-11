/////////////////////////////////////////////////
// Create Quote page component.
//
// @file:   CreateQuotePage.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var withRouter = require('react-router').withRouter;

var AddQuoteForm = require('./AddQuoteForm');
var QuotesStore = require('../../../stores/QuotesStore');
var QuotesActions = require('../../../actions/QuotesActions');

var CreateQuotePage = React.createClass({

    getInitialState: function() {
        return {
            quote: {
                        quoteTypeId: 'OTHER_QUOTE',
                        partyId: '',
                        currencyUomId: '',
                        salesChannelEnumId: 'IND_GEN_SERVICES',
                        issueDate: '',
                        statusId: 'QUOTE_CREATED',
                        validFromDate: '',
                        validThruDate: '',
                        quoteName: '',
                        description: '',
                        contactPartyId: ''
                    },
            addedQuoteId: ''
        };
    },

    componentDidMount: function() {
        QuotesStore.addedQuoteListener(this._onAddedQuote);
    },

    componentWillUnmount: function() {
        QuotesStore.removeListener('addedQuote', this._onAddedQuote);
    },

    setQuoteState: function(event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.quote[ field ] = value;
        this.setState( {quote: this.state.quote} );
    },

    _addQuote: function(event) {
        event.preventDefault();
        QuotesActions.addQuote(this.state.quote);
    },

    _onAddedQuote: function() {

        // After a successful ajax call in the store, calling QuotesStore.addedQuote() will return
        // one of the three results from quoteApi.addQuote, handle with if-else-if-else block
        var result = QuotesStore.addedQuote();

        // User lacks security permission to addQuote
        if (result.hasOwnProperty('message'))
        {
            this.props.updateErrorBox(result.message);
        }
        // User has permission, but there were one or more validation errors
        else if (Object.prototype.toString.call(result) === '[object Array]')
        {
            this.props.updateErrorBox(result);
        }
        // User had permission and no validation errors-- api should return the new quoteId.
        // Note:  the new quoteId won't actually get rendered on this page, but this way we
        // make sure it really posted in order to re-direct.
        else if (result.hasOwnProperty('quoteId')) {
            this.setState({
                addedQuoteId: result.quoteId
            });
            // for successful post to database, redirect to MyQuotesPage
            this.props.router.replace('/cp/quotes/my-quotes');
        }
    },

    render: function (){

        /* jshint ignore:start */
        return (
            <div>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h1>Create Quote</h1>
                        </div>
                        <div className="panel-body">
                            <AddQuoteForm
                                quote={ this.state.quote }
                                onChange={ this.setQuoteState }
                                onFormSubmit={ this._addQuote } />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

// when doing the usual module.exports, wrap CreateQuotePage in with.router in order to have
// property this.props.router.replace to do the redirect to MyQuotesPage upon submitting form data
module.exports = withRouter(CreateQuotePage);