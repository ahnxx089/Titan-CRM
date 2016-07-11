/////////////////////////////////////////////////
// Quotes Panel Body-- child of Quote Details Page
//
// @file:   QuotesPanelBody.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;
var ItemRow = require('./ItemRow');
var AddItemForm = require('./AddItemForm');

var QuotePanelBody = React.createClass({

    componentDidMount: function(){
        // jQuery-UI accordion for AddItem panel
        $('#accordion').accordion({
            active: false,
            collapsible: true
        });
    },

    render: function () {
        /* jshint ignore:start */

        // for displaying UT issueDate and updatedDate more readably
        var issueDate = new Date(this.props.quote.issueDate).toDateString();
        var updatedDate = new Date(this.props.quote.updatedDate).toDateString();

        // for displaying UT validFromDate more readably & deal with null case
        var validFromDate = this.props.quote.validFromDate;
        validFromDate = (validFromDate === null ? '(none)' : new Date(validFromDate).toDateString() );

        // for displaying UT validThruDate more readably & deal with null case
        var validThruDate = this.props.quote.validThruDate;
        validThruDate = (validThruDate === null ? '(none)' : new Date(validThruDate).toDateString() );

        var quoteItems = this.props.quoteItems;
        var quoteItemsJSX = [];
        for (var i = 0; i < quoteItems.length; i++) {
            quoteItemsJSX.push(<ItemRow key={ 'quoteItem_' + i } quoteItem={ quoteItems[i] }/>);
        }

        return(
            <div className="panel panel-default">

                {/* Panel Heading & Body:  the Quote Details */}
                <div className="panel-heading panel-heading-custom">
                    <h1>Details: Quote #{ this.props.quote.quoteId }</h1>
                </div>
                <div className="panel-body">

                    {/* 7 Rows of Quote Details information */}
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Quote Id:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.quoteId }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Quote Name:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.quoteName }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Account Party Id:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">
                                <Link to={ '/cp/accounts/account-details/' + this.props.quote.partyId }>
                                    { this.props.quote.partyId }
                                </Link>
                            </p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Contact Party Id:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">
                                <Link to={ '/cp/contacts/details/' + this.props.quote.contactPartyId }>
                                    { this.props.quote.contactPartyId }
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Issue Date (UT):</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ issueDate }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Current Status:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.statusId }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Quote Type Id:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.quoteTypeId }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Sales Channel:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.salesChannelEnumId }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Valid From (UT):</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ validFromDate }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Valid Thru (UT):</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ validThruDate }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Created By Id:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.createdByPartyId }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Updated (UT):</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ updatedDate }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Currency:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.currencyUomId }</p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-right"><strong>Description:</strong></p>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <p className="text-left">{ this.props.quote.description }</p>
                        </div>
                    </div>

                    {/* Row for the Update Quote button */}
                    <div className="row">
                        <div className="col-lg-5 "></div>
                        <div className="col-lg-2 col-xs-12">
                            <Link to={ '/cp/quotes/update-quote/' + this.props.quote.quoteId } className="btn btn-primary"><span className="fa fa-pencil-square-o"></span>Update Quote</Link>
                        </div>
                        <div className="col-lg-5 "></div>
                    </div>

                    <div className="row">
                        <hr/>
                    </div>

                    {/* Next row contains an Accordion, which contains the child AddItemForm */}
                    <div className="row">
                        <div className="col-lg-12 col-xs-12">
                            <div id="accordion">
                                <h3>
                                    <a className="btn btn-default">
                                        <span className="fa fa-pencil-square-o"></span>Add Item
                                    </a>
                                </h3>
                                <div>
                                    <AddItemForm quote={ this.props.quote } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>

                    {/* Items are individual rows displayed here */}
                    { quoteItemsJSX }

                </div>
            </div>
        );
        /* jshint ignore:end */

    }
});

module.exports = QuotePanelBody;