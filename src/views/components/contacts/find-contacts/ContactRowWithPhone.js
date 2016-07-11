/////////////////////////////////////////////////
// A contact row on Find Contacts page, which includes phone number
//
// @file:   ContactRow.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;

var ContactRowWithPhone = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <tr>
                <td>
                    <Link to={ '/cp/contacts/details/' + this.props.contact.partyId }>
                        { this.props.contact.partyId }
                    </Link>
                </td>
                <td>{ this.props.contact.salutation }</td>
                <td>{ this.props.contact.firstName }</td>
                <td>{ this.props.contact.lastName }</td>
                <td>{ this.props.contact.countryCode }</td>
                <td>{ this.props.contact.areaCode }</td>
                <td>{ this.props.contact.contactNumber }</td>
                <td>
                    <Link to={ '/cp/contacts/details/' + this.props.contact.partyId } className="btn btn-primary btn-xs">
                        <span className="fa fa-eye"></span> View
                    </Link>
                    <Link to={ '/cp/contacts/update/' + this.props.contact.partyId } className="btn btn-primary btn-xs">
                        <span className="fa fa-pencil-square-o"></span> Edit
                    </Link>
                </td>
            </tr>
        );
        /* jshint ignore:end */
    }

});

module.exports = ContactRowWithPhone;