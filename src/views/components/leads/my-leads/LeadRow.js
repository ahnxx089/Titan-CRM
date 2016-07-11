/////////////////////////////////////////////////
// A lead row on My Leads page.
//
// @file:   LeadRow.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/*jshint esversion: 6 */
var React = require('react');
var Link = require('react-router').Link;

const timezoneOffset = new Date().getTimezoneOffset(); // 300 in CDT

var LeadRow = React.createClass({

    render: function () {
        var alreadyChanged = this.props.lead.createdDate;
        var originalInLocal = new Date(alreadyChanged); // Date Object
        originalInLocal.setMinutes(originalInLocal.getMinutes() - timezoneOffset);
        
//        console.log(this.props.lead);
//        console.log(this.props);

        /* jshint ignore:start */
        return (
            <tr>
                {/* <td>{ this.props.lead.partyId }</td> */}
                <td>
                    <Link to={ '/cp/leads/details/' + this.props.lead.partyId }>
                        { this.props.lead.partyId }
                    </Link>
                </td>
            
                <td>{ this.props.lead.salutation }</td>
                <td>{ this.props.lead.firstName }</td>
                <td>{ this.props.lead.lastName }</td>
                <td>{ this.props.lead.description }</td>
                <td>{ this.props.lead.parentPartyId }</td>
                <td>{ originalInLocal.toString() }</td>
            </tr>
        );
        /* jshint ignore:end */
//    } // end of if
}

});

module.exports = LeadRow;