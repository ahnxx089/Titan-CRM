/////////////////////////////////////////////////
// My Quotes page component.
//
// @file:   MyQuotesPage.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var QuoteRow = require('./QuoteRow');
var QuotesStore = require('../../../stores/QuotesStore');
var QuotesActions = require('../../../actions/QuotesActions');

var MyQuotesPage = React.createClass({

    getInitialState: function () {
        return {
            quotesOwned: []
        };
    },

    componentDidMount: function () {
        QuotesStore.addGetDataListener(this._onGetData);

        // Call the async function to get my quotes
        QuotesActions.getQuotesByOwner();
    },

    componentWillUnmount: function () {
        QuotesStore.removeListener('getData', this._onGetData);
    },

    _onGetData: function () {
        this.setState({
            quotesOwned: QuotesStore.getQuotesOwned()
        });
        // Convert the My Quotes HTML table into a nice looking jQuery DataTable
        $('#myQuotesTable').DataTable({
            'order': [[ 0, 'desc' ]]
        });
    },

    render: function () {

        /* jshint ignore:start */
        var quotes = this.state.quotesOwned;
        var quotesJSX = [];

        for (var i = 0; i < quotes.length; i++) {
            // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
            // for an explanation for passing a "key" prop to a child component in for loop
            quotesJSX.push(<QuoteRow key={ 'quote_' + i } quote={ quotes[i]}/>);
        }

        return (
            <div>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h1>My Quotes</h1>
                        </div>
                        <div className="panel-body">
                            <table id="myQuotesTable" className='table'>
                                <thead>
                                    <tr>
                                        <th>Quote ID</th>
                                        <th>Quote Name</th>
                                        <th>Account Party ID</th>
                                        <th>Contact Party ID</th>
                                        <th>Issue Date (UT)</th>
                                        <th>Status Id</th>
                                        <th>Valid Thru (UT)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { quotesJSX }
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

module.exports = MyQuotesPage;