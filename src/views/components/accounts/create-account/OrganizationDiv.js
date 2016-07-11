/////////////////////////////////////////////////
// The Organization/Account-specific component of
// the AccountForm component
// 
//
// @file:   AccountForm.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var OrganizationDiv = React.createClass({
    
    render: function () {
        var account = this.props.account;
        /* jshint ignore: start */
        return (
            <div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="accountName">Account Name</label>  
                    <div className="">
                        <input id="orgName" name="accountName" type="text" placeholder="Name of the organization" className="form-control input-md" required="" onChange={this.props.onChange} value={account.orgName}></input>
                    </div>
                </div>

                <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="officeSiteName">Office Site Name</label>
                    <div>
                        <input id="officeSiteName" name="officeSiteName" type="text" placeholder="Site Name" className="form-control input-md" required="" onChange={this.props.onChange} value={account.officeSiteName}></input>
                    </div>
                </div>
                
            </div>
            
            <div className="row">
                <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="logoImgURL">Logo</label>  
                    <div className="">
                        <input id="logoImgURL" name="logoImgURL" type="url" placeholder="www.samplelogoimage.com" className="form-control input-md" required="" onChange={this.props.onChange} value={account.logoImgURL}></input>
                    </div>
                </div>
            
                <div className="form-group col-md-6">
                    <label className="control-label" htmlFor="comments">Comments</label>  
                    <div className="">
                        <textarea id="comments" name="comments" type="text" placeholder="Comments regarding this account" className="form-control inputBox" required="" onChange={this.props.onChange} value={account.comments}></textarea>
                    </div>
                </div>
            
            </div>
            </div>
        ); 
        /* jshint ignore: end */
    }
});

module.exports = OrganizationDiv;