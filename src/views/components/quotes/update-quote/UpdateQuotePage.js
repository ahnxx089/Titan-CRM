/////////////////////////////////////////////////
// Update Quote page component.
//
// @file:   UpdateQuotePage.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var withRouter = require('react-router').withRouter;

var UpdateQuoteForm = require('./UpdateQuoteForm');
var QuotesStore = require('../../../stores/QuotesStore');
var QuotesActions = require('../../../actions/QuotesActions');

var UpdateQuotePage = React.createClass({

    getInitialState: function() {
        return {
            quote: {},
            initialValidFromDate: null,
            initialValidThruDate: null,
            initialIssueDate: null
        };
    },

    componentDidMount: function() {
        QuotesStore.addGetDataListener(this._onGetQuote);
        QuotesStore.addPutDataListener(this._onUpdatedQuote);
        QuotesActions.getQuoteById(this.props.params.id);
    },

    componentWillUnmount: function() {
        QuotesStore.removeListener('getData', this._onGetQuote);
        QuotesStore.removeListener('putData', this._onUpdatedQuote);
    },

    _onGetQuote: function () {
        this.setState({
            quote: QuotesStore.gotQuote(),
        });
        this.setState({
            initialValidFromDate: this.state.quote.validFromDate,
            initialValidThruDate: this.state.quote.validThruDate,
            initialIssueDate: this.state.quote.issueDate
        });
    },

    setQuoteState: function(event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.quote[ field ] = value;
        this.setState( {quote: this.state.quote} );
        var thisPage = this;
    },

    _updateQuote: function(event) {
        event.preventDefault();
        QuotesActions.updateQuote(this.state.quote);
    },

    _onUpdatedQuote: function () {

        // After a successful ajax call in the store, calling QuotesStore.updatedQuote() will return
        // one of the three results from quoteApi.addQuote, handle with if-else-if-else block
        var result = QuotesStore.updatedQuote();

        // User lacks security permission to updateQuote
        if (result.hasOwnProperty('message'))
        {
            this.props.updateErrorBox(result.message);
        }
        // User has permission, but there were one or more validation errors
        else if (Object.prototype.toString.call(result) === '[object Array]')
        {
            this.props.updateErrorBox(result);
        }
        // User had permission and no validation errors-- api should return the number of rows updated.
        // If that equals 1, then the update was successful, redirect to Quote Details page
        else if (result.numRowsUpdated === 1) {
            this.props.router.replace('/cp/quotes/quote-details/' + this.state.quote.quoteId );
        }

    },

    render: function (){

        /* jshint ignore:start */
        return (
            <div>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h1>Update Quote #{ this.state.quote.quoteId }</h1>
                        </div>
                        <div className="panel-body">
                            <UpdateQuoteForm
                                quote={ this.state.quote }
                                initialValidFromDate={ this.state.initialValidFromDate }
                                initialValidThruDate={ this.state.initialValidThruDate }
                                initialIssueDate={ this.state.initialIssueDate }
                                onChange={ this.setQuoteState }
                                onFormSubmit={ this._updateQuote } />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

// when doing the usual module.exports, wrap UpdateQuotePage in with.router in order to have
// property this.props.router.replace to do the redirect to QuoteDetailsPage upon submitting form data
module.exports = withRouter(UpdateQuotePage);