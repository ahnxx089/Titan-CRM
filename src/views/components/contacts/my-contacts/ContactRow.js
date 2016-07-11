/////////////////////////////////////////////////
// A contact row on My Contacts page.
//
// @file:   ContactRow.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;

var ContactRow = React.createClass({

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

module.exports = ContactRow;