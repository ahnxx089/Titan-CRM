/////////////////////////////////////////////////
// The heading section of the Account Details page,
// containing the logo image, name of the account, 
// its ticker symbol (as an inline glyphicon), and
// the identifier for the account's parent account. 
// 
//
// @file:   DetailsHeading.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var DetailsHeading = React.createClass({
    
    render: function () {
        var account = this.props.account;
        /* jshint ignore: start */
        return (
            <div className="row placeholder">
                <div className="col-xs-6 col-sm-3 center-align">
                    <img src={account.logoImgURL} width="200" height="200" className="img-responsive" alt="Thumbnail image of the account's logo" />
                    <h4>{account.orgName} <span>{account.tickerSymbol}</span></h4>
                        <span className="text-muted"><strong>Parent Account: </strong>{account.parentPartyId}</span>
                </div>
            </div>
        );
        /* jshint ignore: end */
    }
}); 

module.exports = DetailsHeading;