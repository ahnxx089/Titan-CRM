/////////////////////////////////////////////////
// The first content subcomponent section of the 
// Account Details page, containing the table of 
// core info associated with the account.
// 
//
// @file:   MainInfoDiv.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var MainInfoDiv = React.createClass({
    
    render: function () {
        var account = this.props.account;
        /* jshint ignore: start */
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="h2">
                            
                            <div className="btn-toolbar pull-right">

                                <button className="btn btn-secondary btn-sm btn-custom">Edit Account</button>
                                <button className="btn btn-secondary btn-sm btn-danger">Deactivate Account</button>
                            </div>
                            <h2>Account</h2>

                        </div>
                    </div>
                </div>
                        

                <div className="well">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Local Name: </strong>{account.companyName}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Site Name: </strong>{account.officeSiteName}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Annual Revenue: </strong>{account.annualRevenue}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Preferred Currency: </strong>{account.currencyUomId || account.preferredCurrencyUomId}</span>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Industry: </strong>{account.industryEnumId}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Ownership: </strong>{account.ownershipEnumId}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Number of Employees: </strong>{account.numEmployees}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Ticker Symbol: </strong>{account.tickerSymbol}</span>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Description: </strong>{account.description}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Comments: </strong>{account.comments}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Important Note: </strong>{account.importantNote}</span>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            <span><strong>Person Responsible For: </strong>{account.createdBy}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        );
        /* jshint ignore: end */
    }
}); 

module.exports = MainInfoDiv;